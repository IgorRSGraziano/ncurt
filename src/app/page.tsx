"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Urls } from "@prisma/client";
import { Copy, Search, WandSparkles } from "lucide-react";
import Notiflix from "notiflix";
import React from "react";

type Status<T = {}> = {
	success: boolean;
	message: string;
	data?: T;
};

function Url({ url }: { url: string }) {
	return (
		<div className="flex items-center gap-2 justify-center">
			<p className="text-center">{url}</p>
			<Button
				variant={"outline"}
				className="flex items-center gap-2"
				onClick={() => {
					navigator.clipboard.writeText(url);
					Notiflix.Notify.success("URL copiada!");
				}}
			>
				<Copy className="h-4 w-4" />
			</Button>
		</div>
	);
}

export default function Home() {
	const [generateStatus, setGenerateStatus] = React.useState<Status | null>();
	const [searchStatus, setSearchStatus] = React.useState<Status | null>(null);

	const [generatedUrls, setGeneratedUrls] = React.useState<string[]>([]);
	const [searchedUrl, setSearchedUrl] = React.useState<string | null>(null);

	const generateRef = React.useRef<HTMLInputElement>(null);
	const searchRef = React.useRef<HTMLInputElement>(null);

	function isValidUrl(url: string) {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	async function generateUrl() {
		Notiflix.Loading.pulse("Gerando URL...");
		try {
			const urls = generateRef.current?.value
				.split(";")
				.map((url) => url.trim())
				.filter((url) => url);

			if (!urls?.length) throw new Error("Digite ao menos uma URL");

			for (const url of urls) {
				if (!isValidUrl(url)) throw new Error(`URL inválida: ${url}`);
			}

			const response = await fetch("/api/url", {
				method: "POST",
				body: JSON.stringify({ urls }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) throw new Error("Falha ao gerar URL's");

			const data = (await response.json()) as Status<Urls[]>;

			setGenerateStatus(data);
			setGeneratedUrls(data.success ? data.data!.map((url) => url.url) : []);
		} catch (error) {
			setGenerateStatus({ success: false, message: (error as Error).message ?? "Algo de errado não deu certo..." });
		} finally {
			Notiflix.Loading.remove();
		}
	}

	async function searchUrl() {
		Notiflix.Loading.pulse("Buscando URL...");
		try {
			const url = searchRef.current?.value.trim();

			if (!url) throw new Error("Digite uma URL");

			if (!isValidUrl(url)) throw new Error(`URL inválida: ${url}`);

			const path = new URL(url).pathname;

			const response = await fetch(`/api/url/${path}`, {
				method: "GET",
			});

			if (!response.ok) throw new Error("Falha ao buscar URL");

			const data = (await response.json()) as Status<string>;
			if (!data.success) {
				setSearchStatus(data as Status);
				return;
			}

			setSearchedUrl(data.success ? data.data! : null);
		} catch (error) {
			setSearchStatus({ success: false, message: (error as Error).message ?? "Algo de errado não deu certo..." });
		} finally {
			Notiflix.Loading.remove();
		}
	}

	return (
		<div>
			<h1 className="text-3xl text-center font-bold">Encurte URL&apos;s de forma simples.</h1>
			<div className="mt-12">
				<p className="text-center mb-4 mt-4 text-xl">Digite a URL que deseja encurtar</p>
				<div className="flex gap-2 items-center justify-center">
					<Input type="text" placeholder="https://meusite.com.br" className="w-full rounded-lg transition-all bg-background pr-8 md:w-[200px] lg:w-[500px] text-center" ref={generateRef} />
					<Button variant={"default"} className="flex items-center gap-2" onClick={generateUrl}>
						<p>Gerar</p>
						<WandSparkles className="h-4 w-4" />
					</Button>
				</div>
				<p className="text-center mb-2 text-muted-foreground text-sm mt-2">Você pode enviar uma lista de URL&apos;s passando um &quot;;&quot; entre elas</p>
				{generateStatus && <p className={`text-center ${generateStatus.success ? "text-green-500" : "text-red-500"} mt-2 mb-2`}>{generateStatus.message}</p>}
				{generateStatus?.success && (
					<div className="flex flex-col gap-2 mt-4">
						{generatedUrls.map((url) => {
							const mountedUrl = new URL(window.location.href);
							mountedUrl.pathname = url;
							const urlStr = mountedUrl.toString();
							return <Url key={urlStr} url={urlStr} />;
						})}
					</div>
				)}
			</div>

			<div className="my-12">
				<p className="text-center mb-4 text-xl">Deseja saber aonde uma URL leva?</p>
				<div className="flex gap-2 items-center justify-center">
					<Input type="text" placeholder="https://meusite.com.br" className="w-full rounded-lg transition-all bg-background pr-8 md:w-[200px] lg:w-[500px] text-center" ref={searchRef} />
					<Button variant={"default"} className="flex items-center gap-2" onClick={searchUrl}>
						<p>Buscar</p>
						<Search className="h-4 w-4" />
					</Button>
				</div>
				{searchStatus && <p className={`text-center ${searchStatus.success ? "text-green-500" : "text-red-500"} mt-2`}>{searchStatus.message}</p>}
				{searchedUrl && (
					<div className="mt-4 justify-center flex flex-col">
						<p className="text-center mb-2 text-xl">A URL leva para:</p>
						<Url url={searchedUrl} />
					</div>
				)}
			</div>
		</div>
	);
}

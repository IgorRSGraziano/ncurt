"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, WandSparkles } from "lucide-react";
import Notiflix from "notiflix";
import React from "react";

type Status = {
	success: boolean;
	message: string;
};

export default function Home() {
	const [generateStatus, setGenerateStatus] = React.useState<Status | null>();
	const [searchStatus, setSearchStatus] = React.useState<Status | null>(null);

	const generateRef = React.useRef<HTMLInputElement>(null);
	const searchRef = React.useRef<HTMLInputElement>(null);

	async function generateUrl() {
		Notiflix.Loading.pulse("Gerando URL...");
		try {
			const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
			const urls = generateRef.current?.value
				.split(";")
				.map((url) => url.trim())
				.filter((url) => url);

			if (!urls?.length) throw new Error("Digite ao menos uma URL");

			for (const url of urls) {
				if (!urlRegex.test(url)) throw new Error(`URL inválida: ${url}`);
			}

			const response = await fetch("/api/url", {
				method: "POST",
				body: JSON.stringify({ urls }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) throw new Error("Falha ao gerar URL's");

			const data = (await response.json()) as Status;
			setGenerateStatus(data);
		} catch (error) {
			setGenerateStatus({ success: false, message: (error as Error).message ?? "Algo de errado não deu certo..." });
		} finally {
			Notiflix.Loading.remove();
		}
	}

	return (
		<div>
			<h1 className="text-3xl text-center font-bold">Encurte URL's de forma simples.</h1>
			<div className="mt-12">
				<p className="text-center mb-4 text-xl">Digite a URL que deseja encurtar</p>
				<div className="flex gap-2 items-center justify-center">
					<Input type="text" placeholder="https://meusite.com.br" className="w-full rounded-lg transition-all bg-background pr-8 md:w-[200px] lg:w-[500px] text-center" ref={generateRef} />
					<Button variant={"default"} className="flex items-center gap-2" onClick={generateUrl}>
						<p>Gerar</p>
						<WandSparkles className="h-4 w-4" />
					</Button>
				</div>
				<p className="text-center mb-4 text-muted-foreground text-sm mt-2">Você pode enviar uma lista de URL's passando um ";" entre elas</p>
				{generateStatus && <p className={`text-center ${generateStatus.success ? "text-green-500" : "text-red-500"} mt-2`}>{generateStatus.message}</p>}
			</div>

			<div className="my-12">
				<p className="text-center mb-4 text-xl">Deseja saber aonde uma URL leva?</p>
				<div className="flex gap-2 items-center justify-center">
					<Input type="text" placeholder="https://meusite.com.br" className="w-full rounded-lg transition-all bg-background pr-8 md:w-[200px] lg:w-[500px] text-center" ref={searchRef} />
					<Button variant={"default"} className="flex items-center gap-2">
						<p>Buscar</p>
						<Search className="h-4 w-4" />
					</Button>
				</div>
				{searchStatus && <p className={`text-center ${searchStatus.success ? "text-green-500" : "text-red-500"} mt-2`}>{searchStatus.message}</p>}
			</div>
		</div>
	);
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, WandSparkles } from "lucide-react";

export default function Home() {
	return (
		<div>
			<h1 className="text-3xl text-center font-bold">Encurte URL's de forma simples.</h1>
			<div className="mt-12">
				<p className="text-center mb-4 text-xl">Digite a URL que deseja encurtar</p>
				<div className="flex gap-2 items-center justify-center">
					<Input type="text" placeholder="https://meusite.com.br" className="w-full rounded-lg transition-all bg-background pr-8 md:w-[200px] lg:w-[500px] text-center" />
					<Button variant={"default"} className="flex items-center gap-2">
						<p>Gerar</p>
						<WandSparkles className="h-4 w-4" />
					</Button>
				</div>
				<p className="text-center mb-4 text-muted-foreground text-sm mt-2">Você pode enviar uma lista de URL's passando um ";" entre elas</p>
			</div>

			<div className="my-12">
				<p className="text-center mb-4 text-xl">Deseja saber aonde uma URL leva?</p>
				<div className="flex gap-2 items-center justify-center">
					<Input type="text" placeholder="https://meusite.com.br" className="w-full rounded-lg transition-all bg-background pr-8 md:w-[200px] lg:w-[500px] text-center" />
					<Button variant={"default"} className="flex items-center gap-2">
						<p>Buscar</p>
						<Search className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

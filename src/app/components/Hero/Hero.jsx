import Link from "next/link"

export const Hero = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md flex flex-col justify-center">
                    <img src={'https://i.postimg.cc/cJnKqhgV/logo-ismafer.jpg'} alt='logo' width={200}  className="self-center"/>
                    <p className="py-6 font-light text-[--light]">Ferramentas de uso rápido para criação de anúncios da Ismafer.</p>
                    <div className="flex flex-col gap-4">
                        <Link href={'./image-cutter'}>
                        <button className="btn bg-[--brand]  hover:bg-orange-500 text-[--dark] text-xl w-full">Cortador de imagens</button>
                        </Link>
                        <Link href={'/bg-remover'}>
                        <button className="btn bg-[--brand]  hover:bg-orange-500 text-[--dark] text-xl w-full">Remover fundo</button>
                        </Link>
                        <Link href={'/'}>
                        <button className="btn bg-[--brand]  hover:bg-orange-500 text-[--dark] text-xl w-full">Outra ferramenta</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
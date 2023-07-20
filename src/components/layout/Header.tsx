import Image from "next/image";
import Link from "next/link";

export default function Header() {

    return (
        <header
            className={'flex flex-col pt-[64px] pb-[40px] px-[16px] gap-[32px] md:pt-[100px] md:px-[50px] lg:px-[80px] xl:px-[150px] md:gap-[40px] bg-greyscale-black border-t-greyscale-greyBorder text-white select-none'}>
            <div
                className={'container max-w-[1440px] flex flex-col md:flex-row justify-between gap-y-[32px] md:gap-y-0 pb-[40px] border-b border-primary-purple'}>
                <div className={'md:max-w-[385px]'}>
                    <div className={'h-[24px] w-[156px] relative'}>
                        <Image className={'object-contain'} src={'/Logo.svg'} fill={true} alt={'Logo'}/>
                    </div>
                    <div className={'py-[32px]'}>
                        <p className={'text-sm font-normal leading-5 text-greyscale-bg2'}>

                        </p>
                    </div>
                    <div className={'flex flex-wrap gap-[28px] my-2'}>
                    </div>
                </div>
                <div
                    className={'self-start grid grid-rows-none md:grid-rows-3 grid-flow-row md:grid-flow-col md:justify-end gap-y-[24px] sm:gap-x-[70px] font-poppins'}>
                    <Link href={'/link'}
                          className={'font-semibold text-base leading-6 no-underline hover:opacity-75'}>
                        link</Link>
                </div>
            </div>

            <div
                className={'container max-w-[1440px] grid grid-flow-row md:grid-flow-col md:grid-cols-[1fr_auto_auto_auto] gap-[24px] md:gap-x-[28px]'}>
                <Link href={'/data-request'} target={'_blank'}
                      className={'font-medium text-sm leading-6 no-underline font-poppins hover:opacity-75'}>
                    Personal data request</Link>
            </div>
        </header>
    )
}


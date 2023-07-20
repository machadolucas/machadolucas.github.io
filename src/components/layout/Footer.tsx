import Image from "next/image";
import Insta from "@/icons/Insta.svg";
import Twitter from "@/icons/Twitter.svg";
import Facebook from "@/icons/Facebook.svg";
import LinkedIn from "@/icons/LinkedIn.svg";
import Link from "next/link";

export default function Footer() {

    const socialLinks = [
        {
            svgIcon: <Insta width={'32'} height={'32'} className={'white'}/>,
            title: 'Instagram',
            link: 'https://www.instagram.com/kumitimantti/'
        },
        {
            svgIcon: <Twitter width={'32'} height={'32'} className={'white'}/>,
            title: 'Twitter',
            link: 'https://twitter.com/machadolucasbr'
        },
        {
            svgIcon: <Facebook width={'32'} height={'32'} className={'white'}/>,
            title: 'Facebook',
            link: 'https://www.facebook.com/machadolucas.x'
        },
        {
            svgIcon: <LinkedIn width={'32'} height={'32'} className={'white'}/>,
            title: 'LinkedIn',
            link: 'https://www.linkedin.com/in/machadolucas/'
        }
    ];

    const createSocialLink = (svgIcon: any, title: string, link: string) => {
        return (<Link key={title} className={'inline-block relative w-[32px] h-[32px] hover:opacity-75'}
                      href={link} target={'_blank'} title={title}>{svgIcon}</Link>);
    }

    return (
        <footer
            className={'flex flex-col pt-[64px] pb-[40px] px-[16px] gap-[32px] md:pt-[100px] md:px-[50px] lg:px-[80px] xl:px-[150px] md:gap-[40px] bg-greyscale-black border-t-greyscale-greyBorder text-white select-none'}>
            <div
                className={'container max-w-[1440px] flex flex-col md:flex-row justify-between gap-y-[32px] md:gap-y-0 pb-[40px] border-b border-primary-purple'}>
                <div className={'md:max-w-[385px]'}>
                    <div className={'h-[24px] w-[156px] relative'}>
                        <Image className={'object-contain'} src={'/Logo.svg'} fill={true} alt={'Logo'}/>
                    </div>
                    <div className={'py-[32px]'}>
                        <p className={'text-sm font-normal leading-5 text-greyscale-bg2'}>
                            ...
                        </p>
                    </div>
                    <div className={'flex flex-wrap gap-[28px] my-2'}>
                        {socialLinks.map(socialLink => (
                            createSocialLink(socialLink.svgIcon, socialLink.title, socialLink.link)
                        ))}
                    </div>
                </div>
                <div
                    className={'self-start grid grid-rows-none md:grid-rows-3 grid-flow-row md:grid-flow-col md:justify-end gap-y-[24px] sm:gap-x-[70px] font-poppins'}>
                    <Link href={'/link'}
                          className={'font-semibold text-base leading-6 no-underline hover:opacity-75'}>
                        link</Link>
                </div>
            </div>

        </footer>
    )
}


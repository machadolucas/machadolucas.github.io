import {Averia_Serif_Libre, Chivo} from "next/font/google";

export const averiaSerifLibre = Averia_Serif_Libre({
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-averia',
});

export const chivo = Chivo({
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-chivo',
});
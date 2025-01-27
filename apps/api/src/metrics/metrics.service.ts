import { Injectable } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { ContratoService } from 'src/contrato/contrato.service';
import { MensajeService } from 'src/mensaje/mensaje.service';
import { PropiedadService } from 'src/propiedad/propiedad.service';
import puppeteer from 'puppeteer';

@Injectable()
export class MetricsService {

    constructor(
        private readonly clienteService: ClienteService,
        private readonly contratoService: ContratoService,
        private readonly mensajeService: MensajeService,
        private readonly propiedadService: PropiedadService
    ) { }

    async getAll() {

        let metrics = {};

        const clientes = await this.clienteService.getClientes();
        const contratos = await this.contratoService.getContratos();
        const mensajes = await this.mensajeService.getAllMensajes();
        const propiedades = await this.propiedadService.getPropiedades();
        const ventas = await this.contratoService.getVentas();
        const alquileres = await this.contratoService.getAlquileres();
        const contratos_lastyear = await this.contratoService.getContratosLastYear();

        const masculinos = clientes.filter((cliente) => (cliente.genero == 'Masculino'));
        const femeninos = clientes.filter((cliente) => (cliente.genero == 'Femenino'));
        const otro = clientes.filter((cliente) => (cliente.genero == 'Otro'));

        console.log([masculinos, femeninos, otro])

        //webscrapping
        //const facebook = await this.getFacebookInfo();
        //const google = await this.getGoogleInfo();

        metrics = {
            "cant_clientes": clientes.length,
            "cant_contratos": contratos.length,
            "cant_mensajes": mensajes.length,
            "cant_propiedades": propiedades.length,
            "cant_ventas": ventas.length,
            "cant_alquileres": alquileres.length,
            "contratos_lastyear": contratos_lastyear,
            "cant_masculinos": masculinos.length,
            "cant_femeninos": femeninos.length,
            "cant_otro": otro.length,
            //"facebook": facebook,
            //"google": google,
        }

        return metrics;
    }

    async getFacebookInfo() {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        const fbPageURL = 'https://www.facebook.com/inmobiliariaferreyrapna/?locale=es_LA'; // Reemplaza con la URL de la página de Facebook
        
        await page.goto(fbPageURL, { waitUntil: 'networkidle2' });

        // Extrae el número de seguidores del DOM
        const followers_str = await page.evaluate(() => {
            const element = document.querySelector('a[href="https://www.facebook.com/inmobiliariaferreyrapna/followers/"]');
            return element ? element.textContent : null;
        });

        // Imprime el número de seguidores
        const followers = followers_str.replace(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '').trim();

        const fbReviewersPageURL = 'https://www.facebook.com/inmobiliariaferreyrapna/reviews/?locale=es_LA'; // Reemplaza con la URL de la página de Facebook
        
        await page.goto(fbReviewersPageURL, { waitUntil: 'networkidle2' });

        const review = await page.evaluate(() => {
            const element = document.querySelector('span[class="x193iq5w xeuugli x13faqbe x1vvkbs x10flsy6 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x41vudc x1603h9y x1u7k74 x1xlr1w8 xzsf02u x1yc453h"]');
            return element ? element.textContent : null;
        });

        await browser.close()

        return { followers: followers, review: review }
    }

    async getGoogleInfo() {

        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        const googlePageURL = 'https://www.google.com/search?q=inmobiliaria+ferreyra&oq=inmobiliaria+ferreyra&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyEggBEC4YFBivARjHARiHAhiABDISCAIQLhgUGK8BGMcBGIcCGIAEMhAIAxAuGK8BGMcBGIAEGI4FMg0IBBAuGK8BGMcBGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMzAwN2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x95b452863638d217:0xb1c09f5ab926b7d1,1,,,,'; // Reemplaza con la URL de la página de Facebook
        
        await page.goto(googlePageURL, { waitUntil: 'networkidle2' });

        // Extrae el número de seguidores del DOM
        const review_str = await page.evaluate(() => {
            const element = document.querySelector('span[class="Aq14fc"]');
            return element ? element.textContent : null;
        });

        const count_review_str = await page.evaluate(() => {
            const element = document.querySelector('span[class="z5jxId"]');
            return element ? element.textContent : null;
        });

        await browser.close()

        return { review: review_str, cant_review: count_review_str }

    }

}

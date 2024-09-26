import { Injectable } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { ContratoService } from 'src/contrato/contrato.service';
import { MensajeService } from 'src/mensaje/mensaje.service';
import { PropiedadService } from 'src/propiedad/propiedad.service';

@Injectable()
export class MetricsService {

    constructor(
        private readonly clienteService: ClienteService,
        private readonly contratoService: ContratoService,
        private readonly mensajeService: MensajeService,
        private readonly propiedadService: PropiedadService
    ) {}

    async getAll(){

        let metrics = {};

        const clientes = await this.clienteService.getClientes();
        const contratos = await this.contratoService.getContratos();
        const mensajes = await this.mensajeService.getAllMensajes();
        const propiedades = await this.propiedadService.getPropiedades();

        const ventas = await this.contratoService.getVentas();
        const alquileres = await this.contratoService.getAlquileres();

        metrics = {
            "cant_clientes": clientes.length,
            "cant_contratos": contratos.length,
            "cant_mensajes": mensajes.length,
            "cant_propiedades": propiedades.length,
            "cant_ventas": ventas.length,
            "cant_alquileres": alquileres.length

        }

        return metrics;
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-siderbar',
    templateUrl: './siderbar.component.html',
    styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {
    items: any;
    privileges: any;
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.getPrivilegesAuth();
    }
    getPrivilegesAuth() {
        let privilegesStorage = localStorage.getItem('privileges');
        if (privilegesStorage == undefined || privilegesStorage == null) {
            this.authenticationService.privilegesAuth().subscribe(
                resp => {
                    localStorage.setItem('privileges', JSON.stringify(resp));
                },
                () => {
                    console.log('Error consulte con el administrador.'); // TODO: Revisar posibles bugs de authentication.
                }
            )
        }
        this.privileges = JSON.parse(localStorage.getItem('privileges'));
    }
    ngOnInit() {
        let url = this.router.url;
        this.items = [
            {
                label: 'INICIO',
                icon: 'fa fa-home fa-fw',
                visible: true,
                routerLink: ['/dashboard']
            },
            {
                label: 'ADMINISTRACION',
                icon: 'fa fa-fw fa-globe',
                status: url.search('/administration/') >= 0 ? true : false,
                items: [
                    {
                        label: 'Usuarios',
                        icon: 'fa fa-fw fa-user',
                        visible: this.privileges.users_index,
                        routerLink: ['/administration/users']
                    },
                    {
                        label: 'Roles',
                        icon: 'fa fa-fw fa-reorder',
                        visible: this.privileges.roles_index,
                        routerLink: ['/administration/roles'],
                    },
                    {
                        label: 'Cargos',
                        icon: 'fa fa-fw fa-suitcase',
                        visible: true,
                        routerLink: ['/administration/companies-positions']
                    },
                    {
                        label: 'Centros de Salud',
                        icon: 'fa fa-fw fa-building',
                        visible: true,
                        routerLink: ['/administration/health-centers']
                    }
                ]
            },
            {
                label: 'TRANSACCIONES',
                icon: 'fa fa-fw fa-money',
                status: url.search('/transaction/') >= 0 ? true : false,
                items: [
                    {
                        label: 'Gastos',
                        icon: 'fa fa-fw fa-shopping-cart',
                        visible: true,
                        routerLink: ['/transaction/expenses']
                    },
                    {
                        label: 'Tipo de Gastos',
                        icon: 'fa fa-fw fa-tag',
                        visible: true,
                        routerLink: ['/transaction/types-expenses']
                    },
                    {
                        label: 'Ingresos',
                        icon: 'fa fa-fw fa-dollar'
                    }
                ]
            },
            {
                label: 'PRUEBAS',
                icon: 'fa fa-fw fa-folder-o',
                status: url.search('/test/') >= 0 ? true : false,
                items: [
                    {
                        label: 'Estudios',
                        icon: 'fa fa-fw fa-book',
                        visible: true,
                        routerLink: ['/test/studies']
                    },
                    {
                        label: 'Pruebas Simples',
                        icon: 'fa fa-fw fa-file-o',
                        visible: true,
                        routerLink: ['/test/tests-simples']
                    },
                    {
                        label: 'Pruebas Compuestas',
                        icon: 'fa fa-fw fa-file-text-o',
                        visible: true,
                        routerLink: ['/test/tests-composed']
                    },
                    {
                        label: 'Unidades',
                        icon: 'fa fa-fw fa-pencil-square-o',
                        visible: true,
                        routerLink: ['/test/units']
                    }
                ]
            },
            {
                label: 'PACIENTES',
                icon: 'fa fa-fw fa-users',
                visible: true,
                routerLink: ['/patient']
            },
            {
                label: 'CENTROS DE SALUD',
                icon: 'fa fa-fw fa-ambulance',
                routerLink: ['/health-center']
            },
            {
                label: 'ANALISIS CLINICOS',
                icon: 'fa fa-fw fa-clipboard',
                // status: url.search('/administration/') >= 0 ? true : false,
                items: [
                    {
                        label: 'Protocolos',
                        icon: 'fa fa-fw fa-file-o'
                    },
                    {
                        label: 'Historial Paciente',
                        icon: 'fa fa-fw fa-files-o'
                    },
                    {
                        label: 'Busqueda Avanzada',
                        icon: 'fa fa-fw fa-search'
                    }
                ]
            }
        ];
    }
    cambiarStatus(label: string) {
        let element = this.items.find(item => item.label === label);
        element.status = !element.status;
    }
}

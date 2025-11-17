import { expect } from '@playwright/test';
import { LoginPage } from './loginPage';


export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/dashboard.html';
        this.tituloDashboard = page.getByText('📚 Minha Biblioteca')
        this.nomeUsuario = page.locator('#nomeUsuario');
        this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });
        this.livrosButton = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.favoritosButton = page.getByRole('link', { name: 'Meus Favoritos' });
        this.botaoSair = page.locator('button[class="nav-btn logout"]'); //onclick="logout()"
    };

    async goToDashboard() {
        await this.page.goto(this.url);
    };

    async validarPaginaDashboard() {
        await expect(this.tituloDashboard).toBeVisible();
        await expect(this.page).toHaveURL(this.url);
    }


    async validarUserLogado(nomeEsperado) {
        await expect(this.nomeUsuario).toBeVisible({ timeout: 10000 });
        await expect(this.nomeUsuario).toHaveText(nomeEsperado);
    }

    async validarUsuarioNoLocalStorage(nomeEsperado, emailEsperado) {
        const usuarioSalvo = await this.page.evaluate(() => JSON.parse(localStorage.getItem('usuario')));
        expect(usuarioSalvo).not.toBeNull();
        expect(usuarioSalvo.nome).toBe(nomeEsperado);
        expect(usuarioSalvo.email).toBe(emailEsperado);
    }



}


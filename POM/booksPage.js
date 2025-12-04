import { expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { DashboardPage } from './dashboardPage';

export class BooksPage {
    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/livros.html';
        //Header 
        this.booksPageTitle = page.getByText('📚 Gerenciar Livros')
        this.username = page.locator('#nomeUsuario');
        this.logoutButton = page.locator('button.nav-btn');
        // Navigation  buttons
        this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });
        this.booksButton = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.favoritsButton = page.getByRole('link', { name: 'Meus Favoritos' });
        // add book form
        this.addNewBookTitle = page.getByText('Adicionar Novo Livro');
        this.bookName = page.locator('#nome');
        this.bookAuthor = page.locator('#autor');
        this.bookPages = page.locator('#paginas');
        this.bookDescription = page.locator('#descricao');
        this.bookUrlImg = page.locator('#imagemUrl');
        // Buttons
        this.addBookButotn = page.locator('.button', { type: 'submit' }, { hasText: 'Adicionar Livro' });




        
    }

}
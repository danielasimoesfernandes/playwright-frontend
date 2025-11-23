import { expect } from '@playwright/test';
import { LoginPage } from './loginPage';


export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/dashboard.html';
        //Header 
        this.dashboardTitle = page.getByText('📚 Minha Biblioteca')
        this.username = page.locator('#nomeUsuario');
        this.logoutButton = page.locator('button.nav-btn');
        // Navigation  buttons
        this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });
        this.booksButton = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.favoritsButton = page.getByRole('link', { name: 'Meus Favoritos' });
        // Stats cards 
        this.statsCards = page.locator('.card, .stat-card, [class*="card"]'); // all cards 
        this.totalBooksCard = page.locator('.card:has-text("Total"), .card:has-text("Livros")');
        this.totalPagesCard = page.locator('.card:has-text("Total"), .card:has-text("Páginas")');
        this.totalUsersCard = page.locator('.card:has-text("Usuários")');

        // Recent books section
        this.recentBooksSection = page.locator('.recent-books, [class*="recent"]');
        this.recentBooksGrid = page.locator('#livros-recentes, .books-grid').first();
        this.bookCards = page.locator('#livros-recentes .book-card, .books-grid .book-card');

        // Book card elements (for individual books)
        this.bookImage = page.locator('.books-grid img');
        this.bookTitle = page.locator('.books-grid h3');
        this.bookAuthor = page.locator('.books-grid .book-card p', { hasText: 'Autor' });;
    };

    async goToDashboard() {
        await this.page.goto(this.url);
    };

    async logout() {
        await this.logoutButton.click();
    }

    async verifyDashboardTitle() {
        await expect(this.dashboardTitle).toBeVisible();
        await expect(this.page).toHaveURL(this.url);
    }

    async getUserName() {
        return await this.userNameDisplay.textContent();
    }

    async isUserNameVisible() {
        return await this.userNameDisplay.isVisible();
    }

    async verifyUserInLocalStorage(expectedName, expectedEmail) {
        const savedUser = await this.page.evaluate(() => JSON.parse(localStorage.getItem('usuario')));
        expect(savedUser).not.toBeNull();
        expect(savedUser.nome).toBe(expectedName);
        expect(savedUser.email).toBe(expectedEmail);
    }
    async getStatsCardsCount() {
        return await this.statsCards.count();
    }

    async getRecentBooksCount() {
        return await this.bookCards.count();
    }

    async verifyStatisticsAreDisplayed() {
        await expect(this.statsCards.first()).toBeVisible();
    }

    async clickDashboardOption() {
        await this.dashboardButton.click();
    }

    async clickBooksOption() {
        await this.booksButton.click();
    }

    async clickFavoritesOption() {
        await this.favoritsButton.click();
    }

    // Validar Livros recentes estão visiveis
    async verifyRecentBooksGridLoaded() {
        await expect(this.recentBooksGrid).toBeVisible();
    }

    // Valida últimos livros adicionados
    async verifyMaxRecentBooks(maxBooks = 5) {
        const countBooks = await this.bookCards.count();
        expect(countBooks).toBeLessThanOrEqual(maxBooks);

        for (let i = 0; i < countBooks; i++) {
            const card = this.bookCards.nth(i);
            await expect(card.locator('img')).toBeVisible();
            await expect(card.locator('h3')).toBeVisible();
            await expect(card.locator('p', { hasText: 'Autor' })).toBeVisible();
        }
        console.log(countBooks);
    }


}


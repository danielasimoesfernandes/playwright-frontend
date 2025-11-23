// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../POM/loginPage'
import { DashboardPage } from '../POM/dashboardPage';
import { BooksPage } from '../POM/booksPage';

test('CT-FE-005: Verificar Proteção de Rotas', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const booksPage = new BooksPage(page); 

  // Abrir pagina login (qualquer pagina, so para limpar o storage)
  await loginPage.goToWebsite(); 

  // Limpar storage
  await page.evaluate(() => localStorage.clear());

  // Ir para a página de dashboard sem fazer login
  await dashboardPage.goToDashboard();

  // Validar redirecinamento para Login page 
  await loginPage.verifyLoginPage();
  
});

//////////////////////////////////////////////////////////

test.only('CT-FE-006: Visualizar Dashboard com Estatísticas', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

    await loginPage.goToWebsite(); 
    await loginPage.fillLoginDataMannually('danimaria@gmail.com', 'Test1234');
    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Login realizado com sucesso!');
    await dialog.accept(); // fecha a popup
  });
    await loginPage.clickLogin(); 

  // Abrir pagina login (qualquer pagina, so para limpar o storage)
  await dashboardPage.verifyDashboardTitle(); 
  // Valildar que os cards estão visiveis e têm valores superiores a 0 (visto que temos dados cirados)
  await dashboardPage.verifyStatisticsAreDisplayed();

  await dashboardPage.verifyRecentBooksGridLoaded(); 

  await dashboardPage.verifyMaxRecentBooks();
  
});

//////////////////////////////////////////////////////////

test.only('CT-FE-007: Adicionar Novo Livro', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

    await loginPage.goToWebsite(); 
    await loginPage.fillLoginDataMannually('danimaria@gmail.com', 'Test1234');
    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Login realizado com sucesso!');
    await dialog.accept(); // fecha a popup
  });
    await loginPage.clickLogin(); 

  // Abrir pagina login (qualquer pagina, so para limpar o storage)
  await dashboardPage.verifyDashboardTitle(); 
  // Valildar que os cards estão visiveis e têm valores superiores a 0 (visto que temos dados cirados)
  await dashboardPage.clickBooksOption();

  await dashboardPage.verifyRecentBooksGridLoaded(); 

  await dashboardPage.verifyMaxRecentBooks();
  
});
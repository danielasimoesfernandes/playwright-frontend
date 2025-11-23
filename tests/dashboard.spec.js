// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../POM/loginPage'
import { DashboardPage } from '../POM/dashboardPage';

test('CT-FE-005: Verificar Proteção de Rotas', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Abrir pagina login (qualquer pagina, so para limpar o storage)
  await loginPage.goToWebsite(); 

  // Limpar storage
  await page.evaluate(() => localStorage.clear());

  // Ir para a página de dashboard sem fazer login
  await dashboardPage.goToDashboard();

  // Validar redirecinamento para Login page 
  await loginPage.validarPaginaLogin();
  
});

//////////////////////////////////////////////////////////

test('CT-FE-006: Visualizar Dashboard com Estatísticas', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Abrir pagina login (qualquer pagina, so para limpar o storage)
  await loginPage.goToWebsite(); 

  // Limpar storage
  await page.evaluate(() => localStorage.clear());

  // Ir para a página de dashboard sem fazer login
  await dashboardPage.goToDashboard();

  // Validar redirecinamento para Login page 
  await loginPage.validarPaginaLogin();
  
});
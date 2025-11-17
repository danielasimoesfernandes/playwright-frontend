// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../POM/loginPage'
import { DashboardPage } from '../POM/dashboardPage';

test('CT-FE-003: Login com Sucesso com todas as Validações', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Ir para a página de registo e inserir dados 
  await loginPage.goToWebsite();
  await loginPage.preencherDadosLoginManualmente('danimaria@gmail.com', 'Test1234'); // nome: Dani

  // Validar mensagem na pop up e clicar em ok
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Login realizado com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Validar login
  await loginPage.clicarEntrar();

  // Validar redirecinamento para Dashboard page 
  await dashboardPage.validarPaginaDashboard();

  // Validar nome do user no Header
  await dashboardPage.validarUserLogado("Dani")

  // Validar que ficou no localStorage
  await dashboardPage.validarUsuarioNoLocalStorage('Dani', 'danimaria@gmail.com')
});

//////////////////////////////////////////////////////////

test('CT-FE-003 - 1: Login Simples com Sucesso', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Ir para a página de registo e inserir dados 
  await loginPage.goToWebsite();
  await loginPage.preencherDadosLogin();

  // Validar mensagem na pop up e clicar em ok
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Login realizado com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Validar login
  await loginPage.clicarEntrar();

  // Validar redirecinamento para Dashboard page 
  await dashboardPage.validarPaginaDashboard();

});

//////////////////////////////////////////////////////////

test('CT-FE-004: Login com Credenciais Inválidas', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goToWebsite();
  await loginPage.preencherDadosLoginErrados();
  

  // Validar mensagem na pop up e clicar em ok
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Email ou senha incorretos');
    await dialog.accept(); // fecha a popup
  });

   // Validar login
  await loginPage.clicarEntrar();

  // Validar que o user permanece na mesma página 
  await loginPage.validarPaginaLogin();
  await expect(loginPage.email).not.toHaveValue('');
  await expect(loginPage.senha).not.toHaveValue('');

});


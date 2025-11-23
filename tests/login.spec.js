// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../POM/loginPage'
import { DashboardPage } from '../POM/dashboardPage';


test('CT-FE-003: Login com Sucesso com todas as Validações', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const loginPage = new LoginPage(page); 

  // Ir para a página de registo e inserir dados 
  await loginPage.goToWebsite();
  await loginPage.fillLoginDataMannually('danimaria@gmail.com', 'Test1234'); // nome: Dani

  // Validar mensagem na pop up e clicar em ok
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Login realizado com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Validar login
  await loginPage.clickLogin();

  // Validar redirecinamento para Dashboard page 
  await dashboardPage.verifyDashboardTitle();

  // Validar nome do user no Header
  await dashboardPage.getUserName();
  await dashboardPage.isUserNameVisible(); 

  // Validar que ficou no localStorage
  await dashboardPage.verifyUserInLocalStorage("Dani", "danimaria@gmail.com")
});

//////////////////////////////////////////////////////////

test('CT-FE-003 - 1: Login Simples com Sucesso', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Ir para a página de registo e inserir dados 
  await loginPage.goToWebsite();
  await loginPage.fillLoginData();

  // Validar mensagem na pop up e clicar em ok
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Login realizado com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Validar login
  await loginPage.clickLogin();

  // Validar redirecinamento para Dashboard page 
  await dashboardPage.verifyDashboardTitle();

});

//////////////////////////////////////////////////////////

test('CT-FE-004: Login com Credenciais Inválidas', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goToWebsite();
  await loginPage.fillLoginDataWithWrongData();
  

  // Validar mensagem na pop up e clicar em ok
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Email ou senha incorretos');
    await dialog.accept(); // fecha a popup
  });

   // Validar login
  await loginPage.clickLogin();

});


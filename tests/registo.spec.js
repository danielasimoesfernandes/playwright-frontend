// @ts-check
import { test, expect } from '@playwright/test';

import { RegistoPage } from '../POM/registoPage';
import { LoginPage } from '../POM/loginPage'


test('CT-FE-001: Fluxo Completo de Registro', async ({ page }) => {

  const registoPage = new RegistoPage(page);
  const loginPage = new LoginPage(page);

  // Ir para a página de registo e inserir dados
  await loginPage.goToWebsite();
  await loginPage.clickRegister();
  await registoPage.verifyRegisterPage();
  await registoPage.fillRegisterData();

  // Validar mensagem na pop up e clicar em ok 
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conta criada com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Submeter registo
  await registoPage.submitRegister();

  // Validar redirecinamento para Login page 
  await loginPage.verifyLoginPage(); 

  // Validar que campos do formulário estão vazios 
  await loginPage.clickRegister();
  await expect(registoPage.name).toHaveValue('');
  await expect(registoPage.email).toHaveValue('');
  await expect(registoPage.password).toHaveValue('');
  await expect(registoPage.confirmPassword).toHaveValue('');
});

//////////////////////////////////////////

test('CT-FE-002: Validação de Senhas Não Correspondentes', async ({ page }) => {

  const registoPage = new RegistoPage(page);
  const loginPage = new LoginPage(page);

  // Ir para a página de registo e inserir dados 
  await loginPage.goToWebsite();
  await loginPage.clickRegister();
  await registoPage.verifyRegisterPage();
  await registoPage.fillRegisterDataWithDifferentPasswords();

  // Validar mensagem na pop up e clicar em ok 
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('As senhas não coincidem!');
    await dialog.accept(); // fecha a popup
  });

  // Submeter registo
  await registoPage.submitRegister();

  // Validar que o user permanece na mesma página 
  await registoPage.verifyRegisterPage();
});


test('CT-FE-001: Register my user', async ({ page }) => {

  const registoPage = new RegistoPage(page);
  const loginPage = new LoginPage(page);

  // Ir para a página de registo e inserir dados
  await loginPage.goToWebsite();
  await loginPage.clickRegister();
  await registoPage.verifyRegisterPage();
  await registoPage.fillRegisterWithSpecificData();

  // Validar mensagem na pop up e clicar em ok 
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conta criada com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Submeter registo
  await registoPage.submitRegister();
});

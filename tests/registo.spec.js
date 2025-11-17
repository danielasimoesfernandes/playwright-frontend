// @ts-check
import { test, expect } from '@playwright/test';

import { RegistoPage } from '../POM/registoPage';
import { LoginPage } from '../POM/loginPage'


test('CT-FE-001: Fluxo Completo de Registro', async ({ page }) => {

  const registoPage = new RegistoPage(page);
  const loginPage = new LoginPage(page);

  // Ir para a página de registo e inserir dados
  await loginPage.goToWebsite();
  await loginPage.clicarRegisto();
  await registoPage.validarPaginaRegisto();
  await registoPage.preencherDadosRegisto();

  // Validar mensagem na pop up e clicar em ok 
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conta criada com sucesso!');
    await dialog.accept(); // fecha a popup
  });

  // Submeter registo
  await registoPage.submeterRegisto();

  // Validar redirecinamento para Login page 
  await loginPage.validarPaginaLogin(); 

  // Validar que campos do formulário estão vazios 
  await loginPage.clicarRegisto();
  await expect(registoPage.nome).toHaveValue('');
  await expect(registoPage.email).toHaveValue('');
  await expect(registoPage.senha).toHaveValue('');
  await expect(registoPage.confirmarSenha).toHaveValue('');
});

//////////////////////////////////////////

test('CT-FE-002: Validação de Senhas Não Correspondentes', async ({ page }) => {

  const registoPage = new RegistoPage(page);
  const loginPage = new LoginPage(page);

  // Ir para a página de registo e inserir dados 
  await loginPage.goToWebsite();
  await loginPage.clicarRegisto();
  await registoPage.validarPaginaRegisto();
  await registoPage.preencherDadosRegistoSenhasDiferentes();

  // Validar mensagem na pop up e clicar em ok 
  // Isto tem de ser feito antes de clicar no botão que dá trigger à pop up
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('As senhas não coincidem!');
    await dialog.accept(); // fecha a popup
  });

  // Submeter registo
  await registoPage.submeterRegisto();

  // Validar que o user permanece na mesma página 
  await registoPage.validarPaginaRegisto();
});

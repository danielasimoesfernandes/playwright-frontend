// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../POM/loginPage'

test('CT-FE-003: Login com Sucesso', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goToWebsite();
  await loginPage.preencherDadosLogin();
  await loginPage.clicarEntrar();


});

test('CT-FE-004: Login com Credenciais Inválidas', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goToWebsite();
  await loginPage.preencherDadosLoginErrados();
  await loginPage.clicarEntrar();


});


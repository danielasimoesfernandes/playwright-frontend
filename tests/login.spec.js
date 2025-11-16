// @ts-check
import { test, expect } from '@playwright/test';

import { LoginPage } from '../POM/loginPage'

test('CT-FE-003: Login com Sucesso', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goToWebsite();
  await loginPage.preencherDadosLogin();
  await loginPage.clicarEntrar();


});
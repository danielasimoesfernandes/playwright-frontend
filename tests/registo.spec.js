// @ts-check
import { test, expect } from '@playwright/test';

import { RegistoPage } from '../POM/registoPage';
import { LoginPage } from '../POM/loginPage'
 
test('CT-FE-001: Fluxo Completo de Registro', async ({ page }) => {

  const registoPage = new RegistoPage(page);
  const loginPage = new LoginPage(page);

  await loginPage.goToWebsite();
  await loginPage.clicarRegisto();
  await registoPage.validarTituloPagine();
  await registoPage.preencherDadosRegisto();
  await registoPage.submeterRegisto();


});

//////////////////////////////////////////

test.skip('CT-FE-002: Validação de Senhas Não Correspondentes', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

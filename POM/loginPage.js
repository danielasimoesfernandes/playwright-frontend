import { expect } from '@playwright/test';


export class LoginPage {
   constructor(page) {
      this.page = page;
      this.url = 'http://localhost:3000/login.html';
      this.tituloLogin = page.getByText('📚 Login')
      this.email = page.locator('input[id = "email"]');
      this.senha = page.locator('input[id = "senha"]');
      this.botaoEntrar = page.locator('button[type="submit"]');
      this.botaoRegisto = page.getByRole('link', { name: 'Registre-se' });
   };

   // Abrir website 
   async goToWebsite() {
      await this.page.goto(this.url);
   };

   async validarPaginaLogin() {
      await expect(this.tituloLogin).toBeVisible();
      await expect(this.page).toHaveURL(this.url);
   }

   async clicarRegisto() {
      await this.botaoRegisto.click();
   };

   async preencherDadosLogin() {
      await this.email.click();
      await this.email.fill("dani@gmail.com");
      await this.senha.click();
      await this.senha.fill("Test1234");
   };

   async preencherDadosLoginManualmente(email, senha) {
      await this.email.click();
      await this.email.fill(email);
      await this.senha.click();
      await this.senha.fill(senha);
   };

   async preencherDadosLoginErrados() {
      await this.email.click();
      await this.email.fill("12837902583234@gmail.com");
      await this.senha.click();
      await this.senha.fill("Senhaerrada");
   };

   async clicarEntrar() {
      await this.botaoEntrar.click();
   };

};
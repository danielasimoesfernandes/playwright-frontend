import { expect } from '@playwright/test';


export class LoginPage {
   constructor(page) {
      this.page = page;
      this.url = 'http://localhost:3000/login.html';
      this.loginTitle = page.getByText('📚 Login')
      this.email = page.locator('input[id = "email"]');
      this.senha = page.locator('input[id = "senha"]');
      this.loginButton = page.locator('button[type="submit"]');
      this.registerButton = page.getByRole('link', { name: 'Registre-se' });
   };

   // Abrir website 
   async goToWebsite() {
      await this.page.goto(this.url);
   };

   async verifyLoginPage() {
      await expect(this.loginTitle).toBeVisible();
      await expect(this.page).toHaveURL(this.url);
   }

   async clickRegister() {
      await this.registerButton.click();
   };

   async fillLoginData() {
      await this.email.click();
      await this.email.fill("dani@gmail.com");
      await this.senha.click();
      await this.senha.fill("Test1234");
   };

   async fillLoginDataMannually(email, senha) {
      await this.email.click();
      await this.email.fill(email);
      await this.senha.click();
      await this.senha.fill(senha);
   };

   async fillLoginDataWithWrongData() {
      await this.email.click();
      await this.email.fill("12837902583234@gmail.com");
      await this.senha.click();
      await this.senha.fill("Senhaerrada");
   };

   async clickLogin() {
      await this.loginButton.click();
   };

};
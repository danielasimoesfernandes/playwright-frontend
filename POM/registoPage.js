import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RegistoPage {
  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000/registro.html';
    this.registerTitle = page.getByText('📚 Criar Conta')
    this.name = page.locator('input[id ="nome"]');
    this.email = page.locator('input[id = "email"]');
    this.password = page.locator('input[id = "senha"]');
    this.confirmPassword = page.locator('input[id ="confirmarSenha"]');
    this.registerButton = page.locator('button[type="submit"]');
    
  }


async verifyRegisterPage() {
    await expect(this.registerTitle).toBeVisible(); 
    await expect(this.page).toHaveURL(this.url);
  }

  async fillRegisterData() {
    await this.name.click();
    await this.name.fill("Dani") ;
    await this.email.click();
    await this.email.fill(faker.internet.email());
    await this.password.click();
    await this.password.fill("Test1234"); 
    await this.confirmPassword.click();
    await this.confirmPassword.fill("Test1234") 
  }

  async fillRegisterWithSpecificData() {
    await this.name.click();
    await this.name.fill("Dani") ;
    await this.email.click();
    await this.email.fill("danimaria@gmail.com");
    await this.password.click();
    await this.password.fill("Test1234"); 
    await this.confirmPassword.click();
    await this.confirmPassword.fill("Test1234") 
  }

   async fillRegisterDataWithDifferentPasswords() {
    await this.name.click();
    await this.name.fill("Dani") ;
    await this.email.click();
    await this.email.fill("dani@gmail.com");
    await this.password.click();
    await this.password.fill("Test1234"); 
    await this.confirmPassword.click();
    await this.confirmPassword.fill("1234Test") 
  }

  async submitRegister() {
    await this.registerButton.click();
  }

};


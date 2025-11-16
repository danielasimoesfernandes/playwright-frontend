import { expect } from '@playwright/test';

export class RegistoPage {
  constructor(page) {
    this.page = page;
    this.titulo = page.locator('h1');
    this.nome = page.locator('input[id ="nome"]');
    this.email = page.locator('input[id = "email"]');
    this.senha = page.locator('input[id = "senha"]');
    this.confirmarSenha = page.locator('input[id ="confirmarSenha"]');
    this.botaoRegistar = page.locator('button[type="submit"]');
  }


async validarTituloPagine() {
    await expect(this.titulo).toHaveText('📚 Criar Conta'); 
  }

  async preencherDadosRegisto() {
    await this.nome.click();
    await this.nome.fill("Dani") ;
    await this.email.click();
    await this.email.fill("dani@gmail.com");
    await this.senha.click();
    await this.senha.fill("Test1234"); 
    await this.confirmarSenha.click();
    await this.confirmarSenha.fill("Test1234") 
  }

  async submeterRegisto() {
    await this.botaoRegistar.click();
  }

};
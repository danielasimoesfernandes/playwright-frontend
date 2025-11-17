import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RegistoPage {
  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000/registro.html';
    this.tituloRegisto = page.getByText('📚 Criar Conta')
    this.nome = page.locator('input[id ="nome"]');
    this.email = page.locator('input[id = "email"]');
    this.senha = page.locator('input[id = "senha"]');
    this.confirmarSenha = page.locator('input[id ="confirmarSenha"]');
    this.botaoRegistar = page.locator('button[type="submit"]');
    this.mensagemSucesso = page 
  }


async validarPaginaRegisto() {
    await expect(this.tituloRegisto).toBeVisible(); 
    await expect(this.page).toHaveURL(this.url);
  }

  async preencherDadosRegisto() {
    await this.nome.click();
    await this.nome.fill("Dani") ;
    await this.email.click();
    await this.email.fill(faker.internet.email());
    await this.senha.click();
    await this.senha.fill("Test1234"); 
    await this.confirmarSenha.click();
    await this.confirmarSenha.fill("Test1234") 
  }

   async preencherDadosRegistoSenhasDiferentes() {
    await this.nome.click();
    await this.nome.fill("Dani") ;
    await this.email.click();
    await this.email.fill("dani@gmail.com");
    await this.senha.click();
    await this.senha.fill("Test1234"); 
    await this.confirmarSenha.click();
    await this.confirmarSenha.fill("1234Test") 
  }

  async submeterRegisto() {
    await this.botaoRegistar.click();
  }

};


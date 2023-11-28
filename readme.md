# Sumário

- [Projeto Mobile com React Native, NodeJS e Expo](#projeto-mobile-com-react-native-nodejs-e-expo)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
    - [Instalação do NodeJS](#instalação-do-nodejs)
    - [Instalação de Dependências](#instalação-de-dependências)
    - [Instalação do Expo CLI](#instalação-do-expo-cli)
    - [Inicialização da aplicação Expo](#inicialização-da-aplicação-expo)
  - [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
  - [Lembrete Importante](#lembrete-importante)

# Projeto Mobile com React Native, NodeJS e Expo

Este projeto foi desenvolvido utilizando React Native, NodeJS e Expo. Este documento irá guiá-lo através do processo de instalação dos pacotes necessários, inicialização da aplicação e criação do banco de dados e tabela.

## Pré-requisitos

- NodeJS
- Expo CLI
- Android Studio (para emulação de dispositivo Android)
- MySQL

## Instalação

### Instalação do NodeJS

Visite o [site oficial do Node.js](https://nodejs.org/) para baixar e instalar a versão mais recente.

## Instalação de Dependências

Depois de clonar o repositório para a sua máquina, navegue até o diretório do projeto e execute o seguinte comando para instalar todas as dependências listadas no arquivo `package.json`:

npm install

Isso instalará todos os pacotes do React Native necessários para o projeto, bem como quaisquer bibliotecas de terceiros que o projeto utiliza, como `react-native-animatable`.

### Instalação do Expo CLI

Após a instalação do NodeJS, você pode instalar o Expo CLI globalmente em seu sistema com o seguinte comando:

npm install -g expo-cli

### Inicialização da aplicação Expo

Para inicializar a aplicação, navegue até o diretório do projeto e execute o seguinte comando:

expo start

Isso abrirá uma nova janela em seu navegador com o Metro Bundler. A partir daí, você pode executar a aplicação em um emulador Android através do Android Studio.

## Configuração do Banco de Dados

Estamos usando o MySQL para nosso banco de dados. Aqui está o script para criar o banco de dados e a tabela de funcionários:

CREATE DATABASE paysolutions;

USE paysolutions;

CREATE TABLE funcionarios ( id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255), cpf VARCHAR(14), telefone VARCHAR(15), email VARCHAR(255), sexo CHAR(1), data_nascimento DATE, salario DECIMAL(10, 2) );

Você pode executar este script em qualquer cliente MySQL de sua escolha para configurar o banco de dados.

## Lembrete Importante

Para que o sistema funcione corretamente, você deve ir ao arquivo `/AppFolhaPagamento/middleware/server.js` pelo terminal e rodar o comando `node server.js`. 

Além disso, se você quiser acessar o aplicativo pelo Expo Go no seu celular, você terá que ir nos arquivos das páginas `/AppFolhaPagamento/src/pages/Home/` e alterar a URL de requisição para o seu IPV4 local. Por exemplo: `http://seu-ip-local:3000/funcionarios`.

import { Before, Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "node:assert";

let playlists: Set<string>;
let paginaAtual: string;
let mensagem: "sucesso" | "erro" | "";

Before(function () {
  playlists = new Set<string>();
  paginaAtual = "";
  mensagem = "";
});

Given("eu acesso o sistema como {string}", function (_usuario: string) {
  // Simula que o usuário acessou o sistema.
});

Given("a página {string} está disponível", function (_pagina: string) {
  // Simula que a página existe no sistema.
});

Given("eu estou na página {string}", function (pagina: string) {
  paginaAtual = pagina;
});

Given(
  "eu possuo as playlists {string} e {string}",
  function (playlist1: string, playlist2: string) {
    playlists.add(playlist1);
    playlists.add(playlist2);
  }
);

Given("eu não possuo playlists criadas", function () {
  playlists.clear();
});

Given("eu não possuo a playlist {string}", function (playlist: string) {
  playlists.delete(playlist);
});

Given("eu possuo a playlist {string}", function (playlist: string) {
  playlists.add(playlist);
});

Given("existe a opção de criar playlists", function () {
  // Simula que o botão/opção de criar playlist está disponível.
});

Given("existe a opção de remover a playlist {string}", function (_playlist: string) {
  // Simula que a opção de remover está disponível.
});

Given("existe a opção de editar a playlist {string}", function (_playlist: string) {
  // Simula que a opção de editar está disponível.
});

When("eu acesso a página {string}", function (pagina: string) {
  paginaAtual = pagina;
});

When("eu tento criar a playlist {string}", function (playlist: string) {
  if (playlists.has(playlist)) {
    mensagem = "erro";
    return;
  }

  playlists.add(playlist);
  mensagem = "sucesso";
});

When("eu tento criar uma playlist sem informar nome", function () {
  mensagem = "erro";
});

When("eu tento remover a playlist {string}", function (playlist: string) {
  playlists.delete(playlist);
});

When(
  "eu tento mudar o nome da playlist {string} para {string}",
  function (nomeAntigo: string, nomeNovo: string) {
    if (playlists.has(nomeNovo)) {
      mensagem = "erro";
      return;
    }

    playlists.delete(nomeAntigo);
    playlists.add(nomeNovo);
    mensagem = "sucesso";
  }
);

Then(
  "as playlists {string} e {string} são exibidas",
  function (playlist1: string, playlist2: string) {
    assert.ok(playlists.has(playlist1));
    assert.ok(playlists.has(playlist2));
  }
);

Then("nenhuma playlist é exibida", function () {
  assert.equal(playlists.size, 0);
});

Then("o sistema informa que ainda não existem playlists criadas", function () {
  assert.equal(playlists.size, 0);
});

Then("o sistema cria a playlist {string}", function (playlist: string) {
  assert.ok(playlists.has(playlist));
});

Then(
  "a playlist {string} aparece na página {string}",
  function (playlist: string, pagina: string) {
    assert.equal(paginaAtual, pagina);
    assert.ok(playlists.has(playlist));
  }
);

Then("o sistema exibe uma mensagem de sucesso", function () {
  assert.equal(mensagem, "sucesso");
});

Then("o sistema não cria uma nova playlist", function () {
  assert.equal(mensagem, "erro");
});

Then(
  "a playlist {string} permanece aparecendo uma única vez na página {string}",
  function (playlist: string, pagina: string) {
    assert.equal(paginaAtual, pagina);
    assert.ok(playlists.has(playlist));
  }
);

Then("o sistema exibe uma mensagem de erro", function () {
  assert.equal(mensagem, "erro");
});

Then("o sistema não cria a playlist", function () {
  assert.equal(mensagem, "erro");
});

Then("nenhuma nova playlist aparece na página {string}", function (_pagina: string) {
  assert.equal(mensagem, "erro");
});

Then("o sistema remove a playlist {string}", function (playlist: string) {
  assert.ok(!playlists.has(playlist));
});

Then(
  "a playlist {string} não aparece na página {string}",
  function (playlist: string, pagina: string) {
    assert.equal(paginaAtual, pagina);
    assert.ok(!playlists.has(playlist));
  }
);

Then(
  "a playlist {string} permanece aparecendo na página {string}",
  function (playlist: string, pagina: string) {
    assert.equal(paginaAtual, pagina);
    assert.ok(playlists.has(playlist));
  }
);

Then("o sistema altera o nome da playlist para {string}", function (playlist: string) {
  assert.ok(playlists.has(playlist));
});

Then("o sistema não altera o nome da playlist {string}", function (playlist: string) {
  assert.ok(playlists.has(playlist));
});
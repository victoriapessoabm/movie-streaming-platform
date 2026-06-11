Feature: Gerenciar playlists

As a usuário da plataforma
I want criar, visualizar, editar e remover playlists, além de adicionar e remover filmes nelas
So that eu possa organizar filmes de acordo com minhas preferências

Scenario: Listar playlists de um usuário

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui as playlists "Maratonar nas férias" e "Filmes clássicos"
When é solicitada a listagem de playlists do usuário "Victoria"
Then o sistema retorna as playlists "Maratonar nas férias" e "Filmes clássicos"

Scenario: Listar playlists quando o usuário não possui playlists

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" não possui playlists cadastradas
When é solicitada a listagem de playlists do usuário "Victoria"
Then o sistema retorna uma lista vazia

Scenario: Criar uma nova playlist

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" não possui a playlist "Maratonar nas férias"
When o usuário "Victoria" solicita a criação da playlist "Maratonar nas férias"
Then o sistema cadastra a playlist "Maratonar nas férias" para o usuário "Victoria"
And a playlist "Maratonar nas férias" passa a pertencer ao usuário "Victoria"

Scenario: Impedir criação de playlist com nome já existente para o mesmo usuário

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui a playlist "Filmes clássicos"
When o usuário "Victoria" solicita a criação da playlist "Filmes clássicos"
Then o sistema não cadastra uma nova playlist para o usuário "Victoria"
And o sistema informa que já existe uma playlist com esse nome para o usuário "Victoria"

Scenario: Impedir criação de playlist sem nome

Given existe o usuário "Victoria" autenticado
When o usuário "Victoria" solicita a criação de uma playlist sem informar nome
Then o sistema não cadastra a playlist para o usuário "Victoria"
And o sistema informa que o nome da playlist é obrigatório

Scenario: Remover playlist existente

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui as playlists "Maratonar nas férias" e "Filmes clássicos"
When o usuário "Victoria" solicita a remoção da playlist "Maratonar nas férias"
Then o sistema remove a playlist "Maratonar nas férias" do usuário "Victoria"
And o usuário "Victoria" continua possuindo a playlist "Filmes clássicos"
And o usuário "Victoria" não possui mais a playlist "Maratonar nas férias"

Scenario: Editar o nome de uma playlist

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui a playlist "Maratonar nas férias"
And o usuário "Victoria" não possui a playlist "Maratonar no feriadão"
When o usuário "Victoria" solicita alterar o nome da playlist "Maratonar nas férias" para "Maratonar no feriadão"
Then o sistema altera o nome da playlist para "Maratonar no feriadão" para o usuário "Victoria"
And o usuário "Victoria" não possui mais a playlist "Maratonar nas férias"

Scenario: Impedir edição para um nome já existente do mesmo usuário

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui as playlists "Maratonar nas férias" e "Maratonar no feriadão"
When o usuário "Victoria" solicita alterar o nome da playlist "Maratonar nas férias" para "Maratonar no feriadão"
Then o sistema não altera o nome da playlist "Maratonar nas férias"
And o usuário "Victoria" continua possuindo a playlist "Maratonar nas férias"
And o usuário "Victoria" continua possuindo a playlist "Maratonar no feriadão"
And o sistema informa que já existe uma playlist com esse nome para o usuário "Victoria"

Scenario: Visualizar filmes em uma playlist

Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui a playlist "Filmes clássicos"
And a playlist "Filmes clássicos" contém os filmes "E o vento levou" e "A felicidade não se compra"
When o usuário "Victória" entra na página "Filmes clássicos"
Then o sistema exibe os filmes "E o vento levou" e "A felicidade não se compra"

Scenario: Visualizar playlist quando o usuário não possui filmes nela
Given existe o usuário "Victoria" autenticado
And o usuário "Victoria" possui a playlist "Filmes clássicos"
And a playlist "Filmes clássicos" não possui filmes adicionados
When o usuário "Victória" entra na página "Filmes clássicos"
Then o sistema retorna uma lista vazia 

Scenario: Adicionar filme a uma playlist

Given existe o usuário "Victoria" autenticado
And existe o filme "Top Gun" cadastrado no sistema
And o usuário "Victoria" possui a playlist "Filmes clássicos"
And o usuário "Victoria" possui a playlist "Maratonar nas férias"
When o usuário "Victoria" solicita adicionar o filme "Top Gun" à playlist "Filmes clássicos"
Then o sistema adiciona o filme "Top Gun" à playlist "Filmes clássicos" do usuário "Victoria"
And o sistema não adiciona o filme "Top Gun" à playlist "Maratonar nas férias" do usuário "Victoria"

Scenario: Impedir adição de filme já existente em uma playlist

Given existe o usuário "Victoria" autenticado
And existe o filme "Top Gun" cadastrado no sistema
And o usuário "Victoria" possui a playlist "Filmes clássicos"
And a playlist "Filmes clássicos" do usuário "Victoria" já possui o filme "Top Gun"
When o usuário "Victoria" solicita adicionar o filme "Top Gun" à playlist "Filmes clássicos"
Then o sistema não adiciona novamente o filme "Top Gun" à playlist "Filmes clássicos" do usuário "Victoria"
And a playlist "Filmes clássicos" do usuário "Victoria" mantém apenas uma ocorrência do filme "Top Gun"
And o sistema informa que o filme já está na playlist

Scenario: Remover filme de uma playlist

Given existe o usuário "Victoria" autenticado
And existem os filmes "Top Gun" e "Star Wars" cadastrados no sistema
And o usuário "Victoria" possui a playlist "Filmes clássicos"
And a playlist "Filmes clássicos" do usuário "Victoria" possui o filme "Top Gun"
And a playlist "Filmes clássicos" do usuário "Victoria" possui o filme "Star Wars"
When o usuário "Victoria" solicita remover o filme "Top Gun" da playlist "Filmes clássicos"
Then o sistema remove o filme "Top Gun" da playlist "Filmes clássicos" do usuário "Victoria"
And a playlist "Filmes clássicos" do usuário "Victoria" não possui mais o filme "Top Gun"
And a playlist "Filmes clássicos" do usuário "Victoria" continua possuindo o filme "Star Wars"

Scenario: Consultar playlists disponíveis para adicionar um filme quando o usuário não possui playlists

Given existe o usuário "Victoria" autenticado
And existe o filme "Gran Torino" cadastrado no sistema
And o usuário "Victoria" não possui playlists cadastradas
When o usuário "Victoria" solicita as playlists disponíveis para adicionar o filme "Gran Torino"
Then o sistema retorna uma lista vazia de playlists disponíveis
And o sistema não adiciona o filme "Gran Torino" a nenhuma playlist do usuário "Victoria"
And o sistema informa que não existem playlists disponíveis

Scenario: Visualizar playlists na página Minhas Playlists

Given eu acesso o sistema como "Victoria"
And a página "Minhas Playlists" está disponível
And eu possuo as playlists "Maratonar nas férias" e "Filmes clássicos"
When eu acesso a página "Minhas Playlists"
Then as playlists "Maratonar nas férias" e "Filmes clássicos" são exibidas

Scenario: Visualizar página Minhas Playlists sem playlists criadas

Given eu acesso o sistema como "Victoria"
And a página "Minhas Playlists" está disponível
And eu não possuo playlists criadas
When eu acesso a página "Minhas Playlists"
Then nenhuma playlist é exibida
And o sistema informa que ainda não existem playlists criadas

Scenario: Criar nova playlist

Given eu acesso o sistema como "Victoria"
And eu estou na página "Minhas Playlists"
And eu não possuo a playlist "Maratonar nas férias"
And existe a opção de criar playlists
When eu tento criar a playlist "Maratonar nas férias"
Then o sistema cria a playlist "Maratonar nas férias"
And a playlist "Maratonar nas férias" aparece na página "Minhas Playlists"
And o sistema exibe uma mensagem de sucesso

Scenario: Erro ao criar playlist com nome já existente

Given eu acesso o sistema como "Victoria"
And eu estou na página "Minhas Playlists"
And eu possuo a playlist "Filmes clássicos"
And existe a opção de criar playlists
When eu tento criar a playlist "Filmes clássicos"
Then o sistema não cria uma nova playlist
And a playlist "Filmes clássicos" permanece aparecendo uma única vez na página "Minhas Playlists"
And o sistema exibe uma mensagem de erro

Scenario: Erro ao criar playlist sem informar nome

Given eu acesso o sistema como "Victoria"
And eu estou na página "Minhas Playlists"
And existe a opção de criar playlists
When eu tento criar uma playlist sem informar nome
Then o sistema não cria a playlist
And nenhuma nova playlist aparece na página "Minhas Playlists"
And o sistema exibe uma mensagem de erro

Scenario: Remover uma playlist

Given eu acesso o sistema como "Victoria"
And eu estou na página "Minhas Playlists"
And eu possuo a playlist "Maratonar nas férias"
And eu possuo a playlist "Filmes clássicos"
And existe a opção de remover a playlist "Maratonar nas férias"
When eu tento remover a playlist "Maratonar nas férias"
Then o sistema remove a playlist "Maratonar nas férias"
And a playlist "Maratonar nas férias" não aparece na página "Minhas Playlists"
And a playlist "Filmes clássicos" permanece aparecendo na página "Minhas Playlists"
And o sistema exibe uma mensagem de sucesso

Scenario: Editar o nome de uma playlist

Given eu acesso o sistema como "Victoria"
And eu estou na página "Minhas Playlists"
And eu possuo a playlist "Maratonar nas férias"
And eu não possuo a playlist "Maratonar no feriadão"
And existe a opção de editar a playlist "Maratonar nas férias"
When eu tento mudar o nome da playlist "Maratonar nas férias" para "Maratonar no feriadão"
Then o sistema altera o nome da playlist para "Maratonar no feriadão"
And a playlist "Maratonar no feriadão" aparece na página "Minhas Playlists"
And a playlist "Maratonar nas férias" não aparece na página "Minhas Playlists"
And o sistema exibe uma mensagem de sucesso 

Scenario: Erro ao editar o nome de uma playlist para um nome já existente

Given eu acesso o sistema como "Victoria"
And eu estou na página "Minhas Playlists"
And eu possuo a playlist "Maratonar nas férias"
And eu possuo a playlist "Maratonar no feriadão"
And existe a opção de editar a playlist "Maratonar nas férias"
When eu tento mudar o nome da playlist "Maratonar nas férias" para "Maratonar no feriadão"
Then o sistema não altera o nome da playlist "Maratonar nas férias"
And a playlist "Maratonar nas férias" permanece aparecendo na página "Minhas Playlists"
And a playlist "Maratonar no feriadão" permanece aparecendo na página "Minhas Playlists"
And o sistema exibe uma mensagem de erro 

Scenario: Adicionar filme a uma playlist

Given eu acesso o sistema como "Victoria"
And eu estou na página "Catálogo"
And eu vejo o filme "Top Gun"
And eu possuo a playlist "Filmes clássicos"
And eu possuo a playlist "Maratonar nas férias"
And o filme "Top Gun" possui a opção de ser adicionado a uma playlist
When eu tento adicionar o filme "Top Gun" à playlist "Filmes clássicos"
Then o sistema adiciona o filme "Top Gun" à playlist "Filmes clássicos"
And o sistema não adiciona o filme "Top Gun" à playlist "Maratonar nas férias"
And o sistema exibe uma mensagem de sucesso 

Scenario: Erro ao adicionar filme já existente em uma playlist

Given eu acesso o sistema como "Victoria"
And eu estou na página "Catálogo"
And eu vejo o filme "Top Gun"
And eu possuo a playlist "Filmes clássicos"
And a playlist "Filmes clássicos" já possui o filme "Top Gun"
And o filme "Top Gun" possui a opção de ser adicionado a uma playlist
When eu tento adicionar o filme "Top Gun" à playlist "Filmes clássicos"
Then o sistema não adiciona novamente o filme "Top Gun" à playlist "Filmes clássicos"
And a playlist "Filmes clássicos" mantém apenas uma ocorrência do filme "Top Gun"
And o sistema exibe uma mensagem de erro 

Scenario: Remover filme de uma playlist

Given eu acesso o sistema como "Victoria"
And eu estou na playlist "Filmes clássicos"
And a playlist "Filmes clássicos" possui o filme "Top Gun"
And a playlist "Filmes clássicos" possui o filme "Star Wars"
And o filme "Top Gun" possui a opção de ser removido da playlist "Filmes clássicos"
When eu tento remover o filme "Top Gun" da playlist "Filmes clássicos"
Then o sistema remove o filme "Top Gun" da playlist "Filmes clássicos"
And a playlist "Filmes clássicos" não exibe o filme "Top Gun"
And a playlist "Filmes clássicos" continua exibindo o filme "Star Wars"
And o sistema exibe uma mensagem de sucesso

Scenario: Visualizar playlists disponíveis para adicionar um filme quando o usuário não possui playlists

Given eu acesso o sistema como "Victoria"
And eu estou na página "Catálogo"
And eu vejo o filme "Gran Torino"
And eu não possuo playlists criadas
When eu clico na opção de adicionar o filme "Gran Torino" a uma playlist
Then o sistema não exibe playlists disponíveis
And o sistema não adiciona o filme "Gran Torino" a nenhuma playlist
And o sistema informa que não existem playlists disponíveis

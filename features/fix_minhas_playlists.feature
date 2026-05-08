Scenario Outline: Visualizar playlists padrão na página Minhas Playlists
	Given eu acesso o sistema como “usuário”
    And a página “Minhas Playlists” está disponível
    And uma playlist padrão não pode ser removida ou editada
    When eu acesso a página “Minhas Playlists”
    Then o sistema exibe a playlist “<playlist>”
    And a playlist “<playlist>” aparece como uma playlist padrão 
    And a playlist “<playlist>” não tem a opção de ser removida
    And a playlist “<playlist>” não tem a opção de ser editada

    Examples:
        | playlist        |
        | Favoritos       |
        | Assistir depois |


Scenario: Adicionar nova playlist personalizada
Given eu estou na página “Minhas playlists”
And o sistema não tem a playlist “Maratonar nas férias”
And o sistema possui a playlist “Filmes clássicos”
And existe a opção de criar playlists
When o usuário tenta criar a playlist “Maratonar nas férias”
Then o sistema cria a playlist “Maratonar nas férias”
And a playlist “Maratonar nas férias” aparece na página “Minhas playlists”
And a playlist “Filmes clássicos” permanece aparecendo na página “Minhas playlists"
And o sistema exibe uma mensagem de sucesso

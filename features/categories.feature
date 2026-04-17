Feature: Categorias de Séries e Filmes
  Funcionalidades de visualização e filtragem de conteúdos em seções e playlists

  Scenario Outline: Visualizar conteúdos das seções do usuário
    Given o usuário está na página principal
    And a seção "<secao>" está disponível
    When o usuário seleciona a opção "<secao>"
    Then a seção "<secao>" é exibida
    And os elementos de "<secao>" são exibidos

    Examples:
      | secao             |
      | Favoritos         |
      | Minhas playlists  |
      | Assistir depois   |


  Scenario: Acessar uma playlist
    Given o usuário está na seção "Minhas playlists"
    And a playlist "Filmes clássicos" está cadastrada na seção "Minhas playlists"
    When o usuário seleciona a playlist "Filmes clássicos"
    Then a página da playlist "Filmes clássicos" deve ser exibida
    And os conteúdos da playlist "Filmes clássicos" devem ser apresentados ao usuário


  Scenario: Filtrar filmes em uma playlist
    Given a página da playlist "Filmes clássicos" está sendo visualizada
    And a playlist "Filmes clássicos" contém ao menos um filme do gênero "romance"
    And a playlist "Filmes clássicos" contém filmes de outro gênero
    When o filtro de gênero "romance" é aplicado na playlist
    Then apenas os filmes do gênero "romance" devem ser exibidos 
    And filmes de outros gêneros não devem ser exibidos




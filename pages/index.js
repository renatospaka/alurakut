import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationBoxWrapper } from "../src/components/ProfileRelation"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import React from "react";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.gitHubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLinh" href={`https://github.com/${props.gitHubUser}`}>
          @{props.gitHubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const gitHubUser = "renatospaka";
  const [comunidades, setComunidades] = React.useState([{
    id: "podeserqualquernumeroaleatorioapenasparaconstar",
    title: "Eu odeio acordar cedo",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"   
  }])

  const pessoasFavoritas = [
    "omariosouto",
    //"peas",
    "juunegreiros",
    "renatogroffe",
    "argentinaluiz",
    "wesleywillians",
    "rodrigobranas",
    ///"marcobrunodev",
    //"jeffotoni",
  ];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar gitHubUser={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que voce deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              console.log("Campo: ", dadosDoForm.get("title"))
              console.log("Campo: ", dadosDoForm.get("image"))
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get("title"),
                image: dadosDoForm.get("image"),
              }
              // comunidades.push("Alura Stars");
              const comunidadesAtualizadas = [...comunidades, comunidade] 
              setComunidades(comunidadesAtualizadas);

              console.log(comunidades)
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Imagem da capa (URL)"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationArea"
          style={{ gridArea: "profileRelationArea" }}
        >
          <ProfileRelationBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationBoxWrapper>
          <ProfileRelationBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidades ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

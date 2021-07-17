import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationBoxWrapper } from "../src/components/ProfileRelation"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLinh" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationBox(props) {
  return (
    <ProfileRelationBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.itens.length})
      </h2>
      <ul>
        {/* {props.itens.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          );
        })} */}
      </ul>
    </ProfileRelationBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [communities, setCommunities] = React.useState([])
  const favoritePeople = [
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

  //0 - pegar o array de dados do Github (usuário do Paulo Silveira, porque eu não tenho props.itens)
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(function() {
    fetch("https://api.github.com/users/peas/followers")
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setFollowers(respostaCompleta);
    })

    const token = "813fda4696b6760b9da45627bea408"
    const query = `query {
                          allCommunities {
                            id
                            title
                            imageUrl
                            creatorSlug
                          }
                        }`
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({"query": query})
    })
    .then(response => response.json())
    .then((response) => {
      const theseCommunities = response.data.allCommunities
      setCommunities(theseCommunities)
    })
  }, []);

  //1 - criar um box que vai ter um map, baseado nos itens do array
  // que trouxemos do Github
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
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
              const community = {
                title: dadosDoForm.get("title"),
                imageUrl: dadosDoForm.get("image"),
                creatorSlug: githubUser,
              }

              fetch("/api/communities", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(community),
              })
              .then(async (response) => {
                const resp = await response.json();
                const community = resp.newRecord;
                const updatedCommunities = [...communities, community];
                setCommunities(updatedCommunities);
              })
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
        <div className="profileRelationArea" style={{ gridArea: "profileRelationArea" }}>
          <ProfileRelationBox title="Seguidores" itens={followers} />
          <ProfileRelationBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationBoxWrapper>
          <ProfileRelationBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da communities ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((itemAtual) => {
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)  
  const { isAuthenticated } = await fetch("https://alurakut.vercel.app/api/auth", {
    headers: { Authorization: cookies }
  })
  .then(resp => resp.json())
  
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(cookies.USER_TOKEN)
  return {
    props: {
      githubUser
    },  
  }
}

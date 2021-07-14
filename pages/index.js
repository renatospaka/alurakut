import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationBoxWrapper } from "../src/components/ProfileRelation"
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

function ProfileSideBar(props) {
  //console.log(props.gitHubUser)
  return (
    <Box>
      <img
        src={`https://github.com/${props.gitHubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const gitHubUser = "renatospaka";
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
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationArea"
          style={{ gridArea: "profileRelationArea" }}
        >
          <ProfileRelationBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidades ({pessoasFavoritas.length})
            </h2>
            
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                    </li>
                )
              })}                  
            </ul>
          </ProfileRelationBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

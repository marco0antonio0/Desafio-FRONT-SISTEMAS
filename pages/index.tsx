import { useEffect, useState } from "react";
import TextField from "@/components/textField";
import ButtonTypeCad from "@/components/button";
import { useRouter } from "next/router";
import { JwtTokenStorage } from "@/services/cokieesToken/FnToken";
import { fetcha } from "@/services/fetch";

export default function Home() {
  const [userToken, setUserToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Load, setLoad] = useState(false);

  const tokenStorage = new JwtTokenStorage('jwt_token');

  useEffect(() => {
    const t = tokenStorage.getToken()
    if (t) {
      r.push('/usuario')
    }

  }, [])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoad(true)
    event.preventDefault(); // Prevenir o comportamento padrão de recarregamento da página

    // Verificar se os campos estão vazios
    if (!userEmail || !password) {
      setLoad(false)
      setError('Por favor, preencha todos os campos.');
      return;
    }
    console.log(error)
    // verifica se tem algum erro
    if (error.length == 0) {

      // =============================================
      // Lógica para lidar com a submissão do formulário
      // =============================================
      // dados enviado
      const payload = {
        email: userEmail, senha: password
      }
      // ========================================
      // chama a api
      fetcha.Login(payload).then((e) => {
        // verifica se ocorreu algum erro
        if (e) {
          // caso esteja tudo ok
          const token = tokenStorage.getToken()
          setUserToken(token ? token : "")
          if (userEmail == 'marco@teste.com') {
            r.push('/usuario?t=true')
            setLoad(false)
          } else {
            r.push('/usuario?t=false')
            setLoad(false)
          }
        } else {
          // caso não
          // . . . 
          setLoad(false)
          setError('Email ou senha Incorretos')
          return;
        }
      }).catch((e) => {
        setLoad(false)
        setError('Email ou senha Incorretos')
        return;
      })
    } else {
      setLoad(false)
    }
  };
  // =============================================
  // =============================================
  // =============================================
  const r = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-slate-50 ">
      <div className="flex flex-col m-auto w-[800px] min-h-[500px] bg-white rounded-sm shadow-md lg:w-[90%] smx:w-[100%] smx:mt-20 ">
        <div className="m-auto mb-0 mt-10 border-b-2 w-[70%] flex flex-col">
          <img className="w-[100px] h-[100px] m-auto mb-3" src="/images/logo.png" alt="" />
          <h1 className="m-auto mb-10 text-2xl text-center">Sistema de gerenciamento <br />Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="m-auto mt-0 w-[80%] h-auto py-5 flex flex-col smx:w-[85%]">
          {/* ============================================================== */}
          {/* Entrada do email */}
          <TextField text={"Email"} onchange={(e: string) => {
            setUserEmail(e);
            setError('');
          }}
            type="email" />
          {/* ============================================================== */}
          {/* Entrada da senha */}
          <TextField text={"Senha"} onchange={(e: string) => {
            setPassword(e);
            setError('');
          }}
            type="password" />
          <div className="w-[65%] m-auto mt-5 md:w-[80%] md:mt-2">
            {/* ============================================================== */}
            {/* txt-button para cadastro */}
            <p onClick={() => {
              // escreva uma ação a ser executada
              r.push('/cadastro')
            }}
              className=" text-[#B3B7BD] text-sm cursor-pointer active:scale-[105%] select-none">{"Clique aqui para se cadastrar"}</p>
          </div>
          {/* ============================================================== */}
          {/* Exibir erro, se houver */}
          <div className="w-[65%] m-auto mt-5 md:w-[80%] md:mt-2">
            {error && <p className=" text-red-500 text-sm ">{error}</p>}
          </div>
          {/* ============================================================== */}
          {/* Botão de login */}
          {!Load ? <ButtonTypeCad text="Login" /> :
            <div className="flex ">
              <div className="animate-spin rounded-full h-[50px] w-[50px] border-t-2 border-b-2 border-[#31837D] m-auto my-5"></div>
            </div>}
        </form>
      </div>
    </main>
  );
}



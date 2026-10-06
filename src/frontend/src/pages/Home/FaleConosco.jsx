// pages/Home/FaleConosco.jsx
import { useEffect, useRef, useState } from 'react'
import Accordion from '../../components/ui/Accordion.jsx'
import Button from '../../components/ui/Button.jsx'
import { enviarMensagem } from '../../features/contato/contatoService'

/* Opções de assunto disponíveis para envio de mensagem de suporte */
const ASSUNTOS = ['Dúvida', 'Problema com dispositivo', 'Sugestão', 'Outro']

/* Limite máximo de caracteres permitido na mensagem */
const LIMITE = 500

/* Lista de perguntas e respostas frequentes para autoatendimento */
const FAQ = [
  { p: 'Como adiciono um dispositivo?', r: 'Dispositivos são vinculados à sua conta pela equipe AgroFácil. Se algum estiver faltando, envie uma mensagem abaixo.' },
  { p: 'Por que um dispositivo aparece offline?', r: 'Verifique a bateria e o sinal no local. Se continuar offline depois de alguns minutos, fale conosco.' },
  { p: 'Como altero o modo escuro?', r: 'Em Perfil ou no menu lateral, use a opção "Modo escuro".' },
]

/* Página de suporte com FAQ e formulário para envio de mensagens */
export default function FaleConosco() {
  /* Estados do formulário e controle de envio */
  const [assunto, setAssunto] = useState(ASSUNTOS[0])
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [protocolo, setProtocolo] = useState('')
  
  /* Referência para foco no bloco de confirmação de envio */
  const confirmacaoRef = useRef(null)

  /* Move o foco para a mensagem de confirmação assim que o protocolo for gerado */
  useEffect(() => {
    if (protocolo) confirmacaoRef.current?.focus()
  }, [protocolo])

  /* Processa o envio do formulário de contato para o serviço */
  const enviar = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      const res = await enviarMensagem({ assunto, mensagem })
      if (!res.ok) return setErro(res.message)
      setProtocolo(res.data.protocolo)
    } catch {
      setErro('Não foi possível enviar. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  /* Reseta os campos do formulário para permitir um novo envio */
  const novaMensagem = () => { setProtocolo(''); setMensagem(''); setAssunto(ASSUNTOS[0]) }

  return (
    <>
      <header className="contato-header">
        <h1 className="text-title-l">Fale Conosco</h1>
        <p className="text-body">Encontre respostas rápidas ou envie uma mensagem para nossa equipe.</p>
      </header>

      {/* Seção de perguntas frequentes */}
      <section aria-labelledby="faq-titulo">
        <h2 id="faq-titulo" className="text-title-s contato__secao">Perguntas frequentes</h2>
        <div className="accordion-list">
          {FAQ.map(({ p, r }) => (
            <Accordion key={p} title={p} headingLevel={3}>
              <p className="text-body">{r}</p>
            </Accordion>
          ))}
        </div>
      </section>

      {/* Seção com formulário de envio ou confirmação com número de protocolo */}
      <section aria-labelledby="msg-titulo" className="contato__form-secao">
        <h2 id="msg-titulo" className="text-title-s contato__secao">Envie uma mensagem</h2>

        {protocolo ? (
          <div className="contato-ok" ref={confirmacaoRef} tabIndex={-1} role="status">
            <p className="text-title-s">Mensagem enviada!</p>
            <p className="text-body">Seu protocolo é <strong>{protocolo}</strong>. Responderemos em breve.</p>
            <Button variant="highlight" onClick={novaMensagem}>Enviar outra</Button>
          </div>
        ) : (
          <form className="contato-form" onSubmit={enviar} noValidate>
            <label className="field">
              <span className="text-body">Assunto</span>
              <select className="field__input text-body" value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                {ASSUNTOS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </label>

            <label className="field">
              <span className="text-body">Mensagem</span>
              <textarea className="field__input text-body" rows={5} maxLength={LIMITE} value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                aria-invalid={!!erro} aria-describedby={erro ? 'erro-contato' : 'contador'} />
              <span id="contador" className="text-caption field__contador">{mensagem.length}/{LIMITE}</span>
            </label>

            {erro && <p id="erro-contato" role="alert" className="text-caption field__error">{erro}</p>}

            <Button type="submit" loading={enviando}>Enviar</Button>
          </form>
        )}
      </section>
    </>
  )
}
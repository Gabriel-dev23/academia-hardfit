import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { DotPattern } from '@/components/ui/dot-pattern'
import DoodleCrewFooter from '@/components/ui/doodle-crew-footer'
import '../styles/globals.css'
import '../app.js'
const whatsapp='https://wa.me/5511934609723'
createRoot(document.getElementById('doodle-footer')!).render(
  <DoodleCrewFooter
    wordmark="HARDFIT"
    brand="HardFit Mogi Moderno"
    blurb="Pessoas cuidando de pessoas. Seu próximo passo começa em Mogi Moderno, Mogi das Cruzes."
    tagline="Sua força cresce quando você se sente parte. Vem ser HardFit!"
    palette={{background:'#101110',ink:'#f4cd28',accent:'#f6f6ee'}}
    fontFamily="'Barlow Condensed', Impact, sans-serif"
    serifFamily="Barlow, Arial, sans-serif"
    height="680px"
    columns={[
      {title:'Conheça',links:[{label:'Estrutura',href:'#estrutura'},{label:'Experiência',href:'#experiencia'},{label:'Avaliações',href:'#avaliacoes'}]},
      {title:'Sua visita',links:[{label:'Localização',href:'#localizacao'},{label:'Perguntas frequentes',href:'#faq'},{label:'Consultar planos',href:whatsapp}]},
      {title:'Fale com a gente',links:[{label:'WhatsApp',href:whatsapp},{label:'(11) 93460-9723',href:'tel:+5511934609723'},{label:'Instagram',href:'https://www.instagram.com/hardfit.mogimoderno/'}]},
    ]}
    actions={[{label:'Conhecer a HardFit',href:whatsapp,icon:'bolt',variant:'solid'},{label:'Como chegar',href:'#localizacao',icon:'plane',variant:'outline'}]}
    crew={[
      {kind:'yeti',letter:0,seat:'front',offset:-.3,name:'Guardião da força',says:'Bora treinar? 💪'},
      {kind:'bird',letter:1,seat:'top',name:'Parceiro de treino',says:'Um passo de cada vez!'},
      {kind:'mushroom',letter:2,seat:'front',scale:.85,name:'Turma HardFit',says:'Aqui você faz parte!'},
      {kind:'kid',letter:4,seat:'top',name:'Energia HardFit',says:'Seu ritmo. Sua força!'},
      {kind:'ghost',letter:5,seat:'behind',name:'Motivação',says:'Aparece pra treinar!'},
      {kind:'cat',letter:6,seat:'front',offset:.35,flip:true,name:'Foco',says:'Foco no próximo passo!'},
    ]}
    doodles={['bolt','star','flame','heart','sparkle']}
    doodleCount={9}
    copyright={`© ${new Date().getFullYear()} HardFit Mogi Moderno · Mogi das Cruzes – SP`}
    legal={[]}
    socials={[{label:'Instagram',href:'https://www.instagram.com/hardfit.mogimoderno/'},{label:'WhatsApp',href:whatsapp}]}
  />
)

const patternHost=document.createElement('div')
patternHost.className='experience-dot-pattern'
const experience=document.querySelector('#experiencia')
if(experience){
  experience.prepend(patternHost)
  createRoot(patternHost).render(<DotPattern width={26} height={26} cx={1} cy={1} cr={1.1} className="fill-[#f4cd28]/30 md:fill-[#f4cd28]/40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"/>)
}

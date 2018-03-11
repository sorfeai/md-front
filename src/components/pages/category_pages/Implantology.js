import React from 'react'
import CategoryPage from './../CategoryPage'
import Paragraph from './../../common/Paragraph'

const Implantology = props => {
  const renderContent = () => (
    <div>
      <Paragraph>
        Дентальная имплантация - это процедура установки зубного имплантата с
        последующей фиксацией коронки или другого вида протеза.
        Остеоинтегрированный (вживленный) имплантат с установленной на него
        коронкой практически ничем не отличается от естественного зуба. Если Вам
        установлен современный имплантат, с соблюдением технологии и Вы за ним
        ухаживаете – он прослужит Вам всю жизнь.
      </Paragraph>
      <Paragraph>
        Даже отсутствие одного зуба является показанием к имплантации. Чем
        раньше восстанавливается утраченный зуб, тем меньше последствий для
        здоровья будет в будущем. Поэтому процедура одномоментной имплантации,
        когда имплантат устанавливается сразу после удаления разрушенного зуба,
        стала такой популярной во всем мире. Именно поэтому имплантологи нашей
        клиники стараются проводить одномоментную имплантацию всегда, когда это
        возможно.
      </Paragraph>
      <Paragraph>
        Самое важное в имплантации – это подготовительный этап. Необходимо
        составить подробный план лечения и заранее определиться с видом
        протезирования. К сожалению, многие имплантологи торопятся установить
        имплантаты, не до конца представляя окончательный результат лечения.
      </Paragraph>
    </div>
  )

  const renderAside = (doctor) => null

  return (
    <CategoryPage
      categoryId='5aa011110c8d66733cd75249'
      doctorId='5aa2f77791ce0038c42499d6'
      renderContent={renderContent}
      renderAside={renderAside}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
      voluptas quam, iusto sunt quaerat explicabo consectetur veniam velit aperiam
      nulla laborum minus! Ex similique cumque nesciunt facilis eaque. Labore quod
      qui temporibus, eos aspernatur aperiam cum eveniet consequuntur magnam quam.
      Sed nostrum similique temporibus veritatis alias obcaecati, itaque eos iste.
    </CategoryPage>
  )
}

export default Implantology

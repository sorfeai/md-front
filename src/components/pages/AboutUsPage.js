import React from 'react'
import styles from './../../styles/components/pages/AboutUsPage.css'
import { Paragraph, Link } from './../common'
import { NarrowPage } from './index'
import PhotoGallery from './../PhotoGallery'

const AboutUsPage = () => (
  <NarrowPage heading='О нашей стоматологии'>
    <div className={styles['text-content']}>
      <Paragraph>
        Наша стоматология начала свою работу в Домодедово 28 июля 2011 года. Мы
        расположены в динамично развивающемся центральном микрорайоне города, на
        первом этаже многоквартирного дома с развитой инфраструктурой, хорошим
        подъездом, что в наше время имеет немаловажное значение. Опыт и
        квалификация наших <Link href='/staff'>врачей</Link>, широкий  спектр
        услуг <Link href='/pricelist'>по доступным ценам</Link>, удачное
        месторасположение — вот главные составляющие, которые вы найдете в нашей
        стоматологии. Мы хотим стать одними из лучших, и имеем для этого все
        необходимое. Основной задачей, поставленной перед персоналом нашей
        клиники — это индивидуальный подход к каждому пациенту, здесь каждый, и
        взрослый и маленький получит профессиональное лечение, комплексный
        подход и деликатное отношение. Мы не хотим, чтобы люди откладывали
        лечение из-за финансовых затруднений, именно поэтому в нашей стоматологи
        предусмотрена оплата лечения в кредит и в рассрочку. Кроме того, мы
        регулярно проводим различные <Link href='/specials'>акции</Link>.
      </Paragraph>
      <Paragraph>
        Стоматологическая клиника «Мед-Дент» — это многопрофильная клиника.
        Современное оборудование позволяет проводить детальную диагностику зубов
        и оказывать весь спектр стоматологических услуг. Мы ценим, что пациенты
        доверяют нам самое дорогое — здоровье своих зубов. Мы готовы
        удовлетворить спрос самого взыскательного пациента и оправдать
        возложенные на нас надежды. Чтобы Вы могли убедиться в этом, приглашаем
        Вас посетить нашу клинику.
      </Paragraph>
    </div>
    <PhotoGallery />
  </NarrowPage>
)

export default AboutUsPage

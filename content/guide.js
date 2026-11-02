/* Guide per SEO e GEO: rispondono alle domande che le coppie fanno a Google e agli assistenti AI.
   Ogni guida: slug per lingua, foto, titolo/descrizione/risposta breve e corpo HTML per lingua.
   Nel corpo: link interni come "/faq" (build.js aggiunge il prefisso di lingua) e {{g:id}} per le altre guide.
   Le informazioni legali sono generali: vanno sempre verificate con Comune e consolato. */
const UPDATED = "2026-10-27";

const hub = {
  title: {
    it: "Guide per sposarsi in Puglia e nel Salento | Mary Longo Wedding Planner",
    en: "Guides to getting married in Puglia and Salento | Mary Longo Wedding Planner",
    fr: "Guides pour se marier dans les Pouilles et le Salento | Mary Longo Wedding Planner",
    es: "Guías para casarse en Apulia y el Salento | Mary Longo Wedding Planner",
  },
  desc: {
    it: "Costi, documenti per stranieri, rito simbolico e civile, periodo migliore e location: le guide di Mary Longo, wedding planner a Lecce, per organizzare il matrimonio in Puglia.",
    en: "Costs, legal requirements for foreigners, symbolic and civil ceremonies, the best season and venues: Mary Longo's guides to planning your wedding in Puglia and Salento.",
    fr: "Coûts, documents pour les étrangers, cérémonie symbolique et civile, meilleure saison et lieux : les guides de Mary Longo pour organiser votre mariage dans les Pouilles.",
    es: "Costes, documentos para extranjeros, ceremonia simbólica y civil, mejor época y lugares: las guías de Mary Longo para organizar vuestra boda en Apulia.",
  },
  h1: { it: "Guide per<br><em>sposarsi in Puglia</em>", en: "Guides to<br><em>marrying in Puglia</em>", fr: "Guides pour<br><em>se marier dans les Pouilles</em>", es: "Guías para<br><em>casarse en Apulia</em>" },
  lead: {
    it: "Le risposte alle domande che gli sposi mi fanno più spesso, raccolte in dieci anni di matrimoni a Lecce e nel Salento: costi, documenti, cerimonie, stagioni e location.",
    en: "Answers to the questions couples ask me most often, gathered in ten years of weddings in Lecce and Salento: costs, paperwork, ceremonies, seasons and venues.",
    fr: "Les réponses aux questions que les couples me posent le plus souvent, réunies en dix ans de mariages à Lecce et dans le Salento : coûts, démarches, cérémonies, saisons et lieux.",
    es: "Las respuestas a las preguntas que más me hacen los novios, reunidas en diez años de bodas en Lecce y el Salento: costes, trámites, ceremonias, estaciones y lugares.",
  },
  kicker: { it: "Guide", en: "Guides", fr: "Guides", es: "Guías" },
  read: { it: "Leggi la guida", en: "Read the guide", fr: "Lire le guide", es: "Leer la guía" },
  short: { it: "In breve", en: "In short", fr: "En bref", es: "En resumen" },
  updated: { it: "Aggiornata il 27 ottobre 2026", en: "Updated 27 October 2026", fr: "Mis à jour le 27 octobre 2026", es: "Actualizada el 27 de octubre de 2026" },
  by: { it: "di Mary Longo, wedding planner e celebrante a Lecce", en: "by Mary Longo, wedding planner and celebrant in Lecce", fr: "par Mary Longo, wedding planner et officiante à Lecce", es: "por Mary Longo, wedding planner y oficiante en Lecce" },
  more: { it: "Altre guide", en: "More guides", fr: "Autres guides", es: "Más guías" },
  cta: { it: "Parliamo del vostro matrimonio", en: "Let's talk about your wedding", fr: "Parlons de votre mariage", es: "Hablemos de vuestra boda" },
  ctaText: {
    it: "Ogni matrimonio è diverso: nel primo appuntamento, gratuito, vi aiuto a trasformare queste informazioni in un piano su misura.",
    en: "Every wedding is different: in a free first meeting I help you turn this information into a plan made for you.",
    fr: "Chaque mariage est différent : lors d'un premier rendez-vous gratuit, je vous aide à transformer ces informations en un projet sur mesure.",
    es: "Cada boda es distinta: en una primera cita gratuita os ayudo a convertir esta información en un plan a medida.",
  },
  teaserTitle: { it: "Prima di iniziare: le guide", en: "Before you start: the guides", fr: "Avant de commencer : les guides", es: "Antes de empezar: las guías" },
  teaserBtn: { it: "Tutte le guide", en: "All guides", fr: "Tous les guides", es: "Todas las guías" },
};

const guides = [
  /* ======================================================================= */
  {
    id: "costi",
    img: 101,
    slug: { it: "/guida/quanto-costa-sposarsi-in-puglia", en: "/guides/wedding-cost-puglia", fr: "/guides/cout-mariage-pouilles", es: "/guia/coste-boda-apulia" },
    title: {
      it: "Quanto costa sposarsi in Puglia (e quanto costa una wedding planner)",
      en: "How much does a wedding in Puglia cost (and how much is a wedding planner)?",
      fr: "Combien coûte un mariage dans les Pouilles (et une wedding planner) ?",
      es: "¿Cuánto cuesta casarse en Apulia (y cuánto cuesta una wedding planner)?",
    },
    desc: {
      it: "Le voci del budget di un matrimonio in Puglia e nel Salento, cosa fa salire i costi, quanto costa una wedding planner a Lecce e come restare nel budget.",
      en: "The budget items of a wedding in Puglia and Salento, what drives costs up, how much a wedding planner in Lecce costs and how to stay on budget.",
      fr: "Les postes du budget d'un mariage dans les Pouilles et le Salento, ce qui fait monter les coûts, le prix d'une wedding planner à Lecce et comment respecter son budget.",
      es: "Las partidas del presupuesto de una boda en Apulia y el Salento, qué encarece los costes, cuánto cuesta una wedding planner en Lecce y cómo no salirse del presupuesto.",
    },
    short: {
      it: "Il costo di un matrimonio in Puglia dipende soprattutto da due scelte: <b>numero di invitati</b> e <b>location</b>. Catering e location assorbono di solito la parte più grande del budget; poi vengono fiori e allestimenti, foto e video, musica e abiti. Il compenso di una wedding planner è separato dai fornitori: i miei servizi partono da circa <b>1.200 €</b> e variano in base al tipo di servizio e alla complessità dell'evento.",
      en: "The cost of a wedding in Puglia depends above all on two choices: <b>guest count</b> and <b>venue</b>. Catering and venue usually take the largest share of the budget, followed by flowers and styling, photo and video, music and attire. A wedding planner's fee is separate from supplier costs: my services start from around <b>€1,200</b> and vary with the type of service and the complexity of the event.",
      fr: "Le coût d'un mariage dans les Pouilles dépend surtout de deux choix : le <b>nombre d'invités</b> et le <b>lieu</b>. Le traiteur et le lieu représentent généralement la plus grande part du budget, suivis des fleurs et de la décoration, de la photo et vidéo, de la musique et des tenues. Les honoraires d'une wedding planner sont distincts des prestataires : mes services commencent à environ <b>1 200 €</b> et varient selon le type de service et la complexité de l'événement.",
      es: "El coste de una boda en Apulia depende sobre todo de dos decisiones: el <b>número de invitados</b> y el <b>lugar</b>. El catering y el lugar suelen llevarse la mayor parte del presupuesto; después vienen flores y decoración, foto y vídeo, música y vestidos. Los honorarios de una wedding planner van aparte de los proveedores: mis servicios parten de unos <b>1.200 €</b> y varían según el tipo de servicio y la complejidad del evento.",
    },
    body: {
      it: `
<h2>Quali sono le voci principali del budget?</h2>
<ul>
<li><b>Location</b>: dal ristorante alla masseria in esclusiva per l'intero weekend; spesso incide anche la durata dell'affitto e l'eventuale pernottamento degli ospiti.</li>
<li><b>Catering</b>: di solito si calcola a persona e comprende aperitivo, cena, open bar e torta; è la voce che cresce di più con il numero di invitati.</li>
<li><b>Fiori e allestimenti</b>: cerimonia, tavoli, illuminazione, eventuali tensostrutture.</li>
<li><b>Foto e video</b>, <b>musica</b> (cerimonia, aperitivo, festa), <b>abiti, trucco e parrucco</b>.</li>
<li><b>Grafica e bomboniere</b>: partecipazioni, tableau, menù, segnaposto.</li>
<li><b>Extra spesso dimenticati</b>: trasporti per gli ospiti, diritti SIAE per la musica, IVA sui preventivi, tariffe del Comune per il rito civile, eventuale piano B in caso di pioggia.</li>
</ul>
<h2>Cosa fa salire (o scendere) i costi?</h2>
<p>Le variabili che pesano di più sono la <b>stagione</b> (maggio, giugno e settembre sono i mesi più richiesti), il <b>giorno della settimana</b> (un venerdì o una domenica costa spesso meno di un sabato), l'<b>esclusiva della location</b> e la <b>distanza</b> tra cerimonia e ricevimento. Anche lo stile conta: un matrimonio intimo in masseria con pochi invitati può avere un costo per persona più alto ma un totale più contenuto di un grande ricevimento.</p>
<h2>Quanto costa una wedding planner a Lecce?</h2>
<p>Dipende dal servizio: il <b>coordinamento del giorno</b> è la formula più leggera, l'<b>organizzazione parziale</b> copre solo alcune parti, l'<b>organizzazione completa</b> vi segue dalla prima idea al giorno delle nozze. I miei servizi partono da circa 1.200 €; dopo il primo appuntamento gratuito preparo un preventivo chiaro, senza costi nascosti. I fornitori (location, catering, fiori, fotografo…) si pagano a parte: li scegliamo insieme e confronto i preventivi per voi. Trovate le differenze tra i servizi nelle <a href="/faq">domande frequenti</a>.</p>
<h2>Come restare nel budget?</h2>
<ul>
<li>Decidete subito il numero massimo di invitati: è la scelta che sposta di più il totale.</li>
<li>Scegliete le due o tre priorità su cui investire (per esempio cibo e fotografia) e semplificate il resto.</li>
<li>Valutate una data di bassa stagione o un giorno feriale.</li>
<li>Fate verificare ogni preventivo: IVA, ore extra, costi di trasferta e SIAE sono le sorprese più comuni.</li>
</ul>
<p>Una coppia che vive negli Stati Uniti ha scritto di me: «un matrimonio da favola restando nel budget», organizzato a distanza in soli 4 mesi. Il segreto è un budget realistico deciso all'inizio e rispettato in ogni scelta.</p>`,
      en: `
<h2>What are the main budget items?</h2>
<ul>
<li><b>Venue</b>: from a restaurant to a masseria booked exclusively for the whole weekend; rental length and guest accommodation often matter too.</li>
<li><b>Catering</b>: usually priced per guest and including aperitif, dinner, open bar and cake; it is the item that grows most with the guest count.</li>
<li><b>Flowers and styling</b>: ceremony, tables, lighting and, if needed, a marquee.</li>
<li><b>Photo and video</b>, <b>music</b> (ceremony, aperitif, party), <b>attire, hair and make-up</b>.</li>
<li><b>Stationery and favours</b>: invitations, seating plan, menus, place cards.</li>
<li><b>Often forgotten extras</b>: guest transport, SIAE music rights, VAT on quotes, town hall fees for a civil ceremony and a rain plan.</li>
</ul>
<h2>What drives costs up (or down)?</h2>
<p>The biggest variables are the <b>season</b> (May, June and September are the most requested months), the <b>day of the week</b> (a Friday or Sunday often costs less than a Saturday), <b>exclusive use of the venue</b> and the <b>distance</b> between ceremony and reception. Style matters too: an intimate masseria wedding with few guests can cost more per person but less overall than a large reception.</p>
<h2>How much does a wedding planner in Lecce cost?</h2>
<p>It depends on the service: <b>on-the-day coordination</b> is the lightest option, <b>partial planning</b> covers selected parts, and <b>full planning</b> follows you from the first idea to the wedding day. My services start from around €1,200; after a free first meeting I prepare a clear quote with no hidden costs. Suppliers (venue, catering, flowers, photographer…) are paid separately: we choose them together and I compare the quotes for you. You will find the differences between the services in the <a href="/faq">FAQ</a>.</p>
<h2>How can you stay on budget?</h2>
<ul>
<li>Fix the maximum number of guests first: it is the choice that moves the total the most.</li>
<li>Pick two or three priorities to invest in (for example food and photography) and keep the rest simple.</li>
<li>Consider a shoulder-season date or a weekday.</li>
<li>Have every quote checked: VAT, overtime, travel costs and music rights are the most common surprises.</li>
</ul>
<p>A couple living in the United States wrote about me: “a fairy-tale wedding within budget”, planned remotely in just 4 months. The secret is a realistic budget set at the start and respected in every choice.</p>`,
      fr: `
<h2>Quels sont les principaux postes du budget ?</h2>
<ul>
<li><b>Lieu</b> : du restaurant à la masseria privatisée pour tout le week-end ; la durée de location et l'hébergement des invités comptent souvent aussi.</li>
<li><b>Traiteur</b> : généralement calculé par personne (apéritif, dîner, open bar, gâteau) ; c'est le poste qui augmente le plus avec le nombre d'invités.</li>
<li><b>Fleurs et décoration</b> : cérémonie, tables, éclairage et, si besoin, un chapiteau.</li>
<li><b>Photo et vidéo</b>, <b>musique</b> (cérémonie, apéritif, fête), <b>tenues, coiffure et maquillage</b>.</li>
<li><b>Papeterie et cadeaux invités</b> : faire-part, plan de table, menus, marque-places.</li>
<li><b>Extras souvent oubliés</b> : transport des invités, droits musicaux SIAE, TVA sur les devis, frais de la mairie pour la cérémonie civile et plan B en cas de pluie.</li>
</ul>
<h2>Qu'est-ce qui fait monter (ou baisser) les coûts ?</h2>
<p>Les variables principales sont la <b>saison</b> (mai, juin et septembre sont les plus demandés), le <b>jour de la semaine</b> (un vendredi ou un dimanche coûte souvent moins qu'un samedi), la <b>privatisation du lieu</b> et la <b>distance</b> entre cérémonie et réception. Le style compte aussi : un mariage intime en masseria peut coûter plus par personne mais moins au total qu'une grande réception.</p>
<h2>Combien coûte une wedding planner à Lecce ?</h2>
<p>Cela dépend du service : la <b>coordination du jour J</b> est la formule la plus légère, l'<b>organisation partielle</b> couvre certaines parties, l'<b>organisation complète</b> vous accompagne de la première idée au jour du mariage. Mes services commencent à environ 1 200 € ; après un premier rendez-vous gratuit, je prépare un devis clair, sans frais cachés. Les prestataires sont réglés à part : nous les choisissons ensemble et je compare les devis pour vous. Les différences entre les services sont expliquées dans la <a href="/faq">FAQ</a>.</p>
<h2>Comment respecter son budget ?</h2>
<ul>
<li>Fixez d'abord le nombre maximum d'invités : c'est le choix qui pèse le plus.</li>
<li>Choisissez deux ou trois priorités (par exemple la cuisine et la photographie) et simplifiez le reste.</li>
<li>Pensez à une date hors pleine saison ou à un jour de semaine.</li>
<li>Faites vérifier chaque devis : TVA, heures supplémentaires, frais de déplacement et droits musicaux sont les surprises les plus fréquentes.</li>
</ul>
<p>Un couple vivant aux États-Unis a écrit à mon sujet : « un mariage de conte de fées sans dépasser le budget », organisé à distance en seulement 4 mois.</p>`,
      es: `
<h2>¿Cuáles son las principales partidas del presupuesto?</h2>
<ul>
<li><b>Lugar</b>: desde un restaurante hasta una masseria en exclusiva todo el fin de semana; también cuentan la duración del alquiler y el alojamiento de los invitados.</li>
<li><b>Catering</b>: suele calcularse por persona (aperitivo, cena, barra libre y tarta); es la partida que más crece con el número de invitados.</li>
<li><b>Flores y decoración</b>: ceremonia, mesas, iluminación y, si hace falta, una carpa.</li>
<li><b>Foto y vídeo</b>, <b>música</b> (ceremonia, aperitivo, fiesta), <b>vestidos, peluquería y maquillaje</b>.</li>
<li><b>Papelería y detalles</b>: invitaciones, seating, menús, marcasitios.</li>
<li><b>Extras que se olvidan</b>: transporte de invitados, derechos musicales SIAE, IVA en los presupuestos, tasas del ayuntamiento para la ceremonia civil y plan B por lluvia.</li>
</ul>
<h2>¿Qué encarece (o abarata) los costes?</h2>
<p>Las variables que más pesan son la <b>temporada</b> (mayo, junio y septiembre son los meses más solicitados), el <b>día de la semana</b> (un viernes o un domingo suele costar menos que un sábado), la <b>exclusividad del lugar</b> y la <b>distancia</b> entre ceremonia y banquete. También cuenta el estilo: una boda íntima en masseria puede costar más por persona pero menos en total que un gran banquete.</p>
<h2>¿Cuánto cuesta una wedding planner en Lecce?</h2>
<p>Depende del servicio: la <b>coordinación del día</b> es la opción más ligera, la <b>organización parcial</b> cubre algunas partes y la <b>organización completa</b> os acompaña desde la primera idea hasta el día de la boda. Mis servicios parten de unos 1.200 €; tras una primera cita gratuita preparo un presupuesto claro, sin costes ocultos. Los proveedores se pagan aparte: los elegimos juntos y comparo los presupuestos por vosotros. Encontraréis las diferencias entre servicios en las <a href="/faq">preguntas frecuentes</a>.</p>
<h2>¿Cómo no salirse del presupuesto?</h2>
<ul>
<li>Decidid primero el número máximo de invitados: es lo que más mueve el total.</li>
<li>Elegid dos o tres prioridades (por ejemplo comida y fotografía) y simplificad el resto.</li>
<li>Valorad una fecha de temporada media o un día laborable.</li>
<li>Haced revisar cada presupuesto: IVA, horas extra, desplazamientos y derechos musicales son las sorpresas más comunes.</li>
</ul>
<p>Una pareja que vive en Estados Unidos escribió sobre mí: «una boda de cuento sin salirnos del presupuesto», organizada a distancia en solo 4 meses.</p>`,
    },
    related: [1, 7],
  },
  /* ======================================================================= */
  {
    id: "stranieri",
    img: 157,
    slug: { it: "/guida/sposarsi-in-italia-da-stranieri", en: "/guides/getting-married-in-italy-as-a-foreigner", fr: "/guides/se-marier-en-italie-etrangers", es: "/guia/casarse-en-italia-extranjeros" },
    title: {
      it: "Sposarsi in Italia da stranieri: documenti, tempi e tipi di cerimonia",
      en: "Getting married in Italy as a foreigner: documents, timing and types of ceremony",
      fr: "Se marier en Italie quand on est étranger : documents, délais et types de cérémonie",
      es: "Casarse en Italia siendo extranjero: documentos, plazos y tipos de ceremonia",
    },
    desc: {
      it: "Rito civile, religioso o simbolico: quali documenti servono agli stranieri per sposarsi in Puglia (nulla osta, apostille, traduzioni), i passaggi in Comune e come vi aiuta una wedding planner.",
      en: "Civil, religious or symbolic: which documents foreigners need to marry in Puglia (nulla osta, apostille, translations), the town hall steps and how a wedding planner helps.",
      fr: "Civil, religieux ou symbolique : les documents nécessaires aux étrangers pour se marier dans les Pouilles (nulla osta, apostille, traductions), les étapes en mairie et l'aide d'une wedding planner.",
      es: "Civil, religiosa o simbólica: qué documentos necesitan los extranjeros para casarse en Apulia (nulla osta, apostilla, traducciones), los pasos en el ayuntamiento y cómo ayuda una wedding planner.",
    },
    short: {
      it: "Gli stranieri possono sposarsi in Italia con <b>rito civile</b> (valido per legge), <b>religioso</b> o <b>simbolico</b> (senza valore legale). Per il rito civile ogni sposo presenta al Comune il <b>nulla osta</b> al matrimonio o il documento equivalente del proprio Paese, insieme al passaporto e, se richiesti, a certificati con <b>apostille</b> e <b>traduzione ufficiale</b>. I requisiti cambiano secondo nazionalità e Comune: conviene iniziare almeno 3–4 mesi prima.",
      en: "Foreigners can marry in Italy with a <b>civil</b> ceremony (legally binding), a <b>religious</b> one or a <b>symbolic</b> one (no legal effect). For a civil wedding each partner gives the town hall a <b>nulla osta</b> — a declaration that there is no impediment to the marriage — or the equivalent document from their country, plus a passport and, where required, certificates with an <b>apostille</b> and an <b>official Italian translation</b>. Requirements vary by nationality and town hall: start at least 3–4 months ahead.",
      fr: "Les étrangers peuvent se marier en Italie civilement (<b>valeur légale</b>), religieusement ou par une <b>cérémonie symbolique</b> (sans effet légal). Pour le mariage civil, chaque époux remet à la mairie le <b>nulla osta</b> — l'attestation d'absence d'empêchement — ou le document équivalent de son pays, avec son passeport et, si demandé, des actes <b>apostillés</b> et <b>traduits officiellement</b> en italien. Les exigences varient selon la nationalité et la commune : commencez au moins 3 à 4 mois avant.",
      es: "Los extranjeros pueden casarse en Italia por lo <b>civil</b> (con validez legal), por la <b>iglesia</b> o con una <b>ceremonia simbólica</b> (sin efectos legales). Para la boda civil cada contrayente presenta en el ayuntamiento el <b>nulla osta</b> — la declaración de que no existen impedimentos — o el documento equivalente de su país, junto al pasaporte y, si se piden, actas con <b>apostilla</b> y <b>traducción oficial</b> al italiano. Los requisitos cambian según nacionalidad y ayuntamiento: empezad al menos 3–4 meses antes.",
    },
    body: {
      it: `
<h2>Quali tipi di cerimonia potete scegliere?</h2>
<ul>
<li><b>Rito civile</b>: celebrato dall'ufficiale di stato civile del Comune (o da una persona delegata dal sindaco) in municipio o in una location riconosciuta dal Comune. È valido per legge e si può registrare nel vostro Paese.</li>
<li><b>Rito religioso</b>: per il matrimonio cattolico servono i documenti della vostra parrocchia, il corso prematrimoniale e l'autorizzazione delle diocesi coinvolte; se registrato in Comune ha anche effetti civili.</li>
<li><b>Rito simbolico</b>: non ha valore legale e per questo si può celebrare ovunque, nella lingua che preferite. Molte coppie lo abbinano a un rito civile già celebrato a casa. Ne parlo nella guida <a href="{{g:rito}}">rito simbolico e rito civile</a>.</li>
</ul>
<h2>Quali documenti servono per il rito civile?</h2>
<ul>
<li><b>Nulla osta</b> al matrimonio (o documento equivalente) rilasciato dalle autorità del vostro Paese, di solito tramite ambasciata o consolato.</li>
<li><b>Passaporto</b> valido.</li>
<li>Se richiesti dal Comune: <b>estratto di nascita</b>, eventuale sentenza di divorzio o certificato di morte del precedente coniuge, con <b>apostille</b> e <b>traduzione ufficiale</b> in italiano.</li>
</ul>
<p>Alcuni esempi: ai cittadini <b>statunitensi</b> di solito servono l'<i>Atto Notorio</i> (reso davanti a un consolato italiano negli USA, valido circa 90 giorni) e la <i>Dichiarazione Giurata</i> (resa all'ambasciata o a un consolato USA in Italia); i cittadini <b>britannici</b> chiedono un <i>Certificate of No Impediment</i> che viene convertito in nulla osta secondo le istruzioni del governo britannico. I cittadini UE seguono in genere una procedura più semplice. Le regole cambiano: verificate sempre con il vostro consolato e con il Comune scelto.</p>
<h2>Quali sono i passaggi e i tempi?</h2>
<ol>
<li><b>6–12 mesi prima</b>: scelta della data, del Comune e della location (se volete il rito civile fuori dal municipio, deve essere una sede autorizzata dal Comune).</li>
<li><b>3–4 mesi prima</b>: richiesta dei documenti nel vostro Paese, apostille e traduzioni.</li>
<li><b>Qualche giorno prima del matrimonio</b>: appuntamento in Comune per la verifica dei documenti e la dichiarazione di matrimonio, con testimoni ed eventuale interprete. Se nessuno dei due risiede in Italia, di solito non servono pubblicazioni in Italia; il Comune vi indicherà la procedura esatta.</li>
<li><b>Il giorno delle nozze</b>: rito civile con due testimoni maggiorenni e, se non parlate italiano, un interprete.</li>
</ol>
<h2>Come vi aiuto?</h2>
<p>Mi occupo dei contatti con il Comune, del calendario dei documenti, delle traduzioni e dell'interprete, e vi accompagno nel giorno della dichiarazione. Celebro personalmente in italiano, inglese e francese, così la vostra cerimonia può essere pensata nella vostra lingua. Ho seguito coppie arrivate da Stati Uniti, Lituania e da tutta Europa: guardate il <a href="/real-wedding-1">matrimonio in piazza nel Salento</a> di una coppia di Los Angeles.</p>
<p class="note">Queste informazioni sono una guida generale aggiornata a ottobre 2026: non sostituiscono le indicazioni ufficiali del vostro consolato e del Comune.</p>`,
      en: `
<h2>Which types of ceremony can you choose?</h2>
<ul>
<li><b>Civil ceremony</b>: officiated by the town's civil registrar (or by a person delegated by the mayor) at the town hall or at a venue recognised by the town hall. It is legally binding and can be registered in your home country.</li>
<li><b>Religious ceremony</b>: a Catholic wedding requires documents from your parish, a marriage preparation course and the approval of the dioceses involved; once registered with the town hall it also has civil effect.</li>
<li><b>Symbolic ceremony</b>: it has no legal effect, so it can take place anywhere and in any language. Many couples combine it with a civil ceremony already held at home. More in the guide <a href="{{g:rito}}">symbolic vs civil ceremony</a>.</li>
</ul>
<h2>Which documents do you need for a civil wedding?</h2>
<ul>
<li>A <b>nulla osta</b> (declaration that there is no impediment to the marriage) or the equivalent document issued by your country, usually through your embassy or consulate.</li>
<li>A valid <b>passport</b>.</li>
<li>If the town hall requires them: <b>birth certificate</b>, any divorce decree or death certificate of a previous spouse, with an <b>apostille</b> and an <b>official Italian translation</b>.</li>
</ul>
<p>Some examples: <b>US citizens</b> usually need an <i>Atto Notorio</i> (sworn before an Italian consulate in the USA, valid about 90 days) and a <i>Dichiarazione Giurata</i> (sworn at the US embassy or a US consulate in Italy); <b>British citizens</b> apply for a <i>Certificate of No Impediment</i>, which is converted into a nulla osta following the UK government's instructions. EU citizens usually follow a simpler procedure. Rules change: always check with your consulate and with the chosen town hall.</p>
<h2>What are the steps and the timeline?</h2>
<ol>
<li><b>6–12 months before</b>: choose the date, the town and the venue (for a civil ceremony outside the town hall, it must be a venue authorised by the town).</li>
<li><b>3–4 months before</b>: request the documents in your country, apostilles and translations.</li>
<li><b>A few days before the wedding</b>: appointment at the town hall to check the documents and make the declaration of intent to marry, with witnesses and, if needed, an interpreter. If neither of you lives in Italy, banns are usually not required in Italy; the town hall will confirm the exact procedure.</li>
<li><b>The wedding day</b>: civil ceremony with two adult witnesses and, if you do not speak Italian, an interpreter.</li>
</ol>
<h2>How do I help?</h2>
<p>I handle the contacts with the town hall, the document schedule, translations and the interpreter, and I come with you to the declaration. I personally officiate in Italian, English and French, so your ceremony can be written in your own language. I have worked with couples from the United States, Lithuania and all over Europe: see the <a href="/real-wedding-1">wedding in a Salento town square</a> of a couple from Los Angeles.</p>
<p class="note">This is general guidance updated in October 2026: it does not replace the official instructions of your consulate and of the town hall.</p>`,
      fr: `
<h2>Quels types de cérémonie pouvez-vous choisir ?</h2>
<ul>
<li><b>Cérémonie civile</b> : célébrée par l'officier d'état civil de la commune (ou une personne déléguée par le maire) à la mairie ou dans un lieu reconnu par la commune. Elle a une valeur légale et peut être transcrite dans votre pays.</li>
<li><b>Cérémonie religieuse</b> : un mariage catholique demande les documents de votre paroisse, une préparation au mariage et l'accord des diocèses concernés ; transcrit en mairie, il a aussi des effets civils.</li>
<li><b>Cérémonie symbolique</b> : sans valeur légale, elle peut donc avoir lieu partout et dans votre langue. Beaucoup de couples l'associent à un mariage civil déjà célébré chez eux. Voir le guide <a href="{{g:rito}}">cérémonie symbolique et civile</a>.</li>
</ul>
<h2>Quels documents pour le mariage civil ?</h2>
<ul>
<li>Le <b>nulla osta</b> (attestation d'absence d'empêchement) ou le document équivalent délivré par votre pays, en général via l'ambassade ou le consulat.</li>
<li>Un <b>passeport</b> valide.</li>
<li>Si la commune les demande : <b>acte de naissance</b>, jugement de divorce ou acte de décès du précédent conjoint, avec <b>apostille</b> et <b>traduction officielle</b> en italien.</li>
</ul>
<p>Exemples : les citoyens <b>américains</b> ont généralement besoin d'un <i>Atto Notorio</i> (fait auprès d'un consulat italien aux États-Unis, valable environ 90 jours) et d'une <i>Dichiarazione Giurata</i> (faite à l'ambassade ou à un consulat américain en Italie) ; les <b>Britanniques</b> demandent un <i>Certificate of No Impediment</i>. Les citoyens de l'UE suivent en général une procédure plus simple. Vérifiez toujours auprès de votre consulat et de la commune choisie.</p>
<h2>Quelles sont les étapes et les délais ?</h2>
<ol>
<li><b>6 à 12 mois avant</b> : choix de la date, de la commune et du lieu (pour un mariage civil hors de la mairie, le lieu doit être autorisé par la commune).</li>
<li><b>3 à 4 mois avant</b> : demande des documents dans votre pays, apostilles et traductions.</li>
<li><b>Quelques jours avant</b> : rendez-vous en mairie pour le contrôle des documents et la déclaration de mariage, avec témoins et, si besoin, un interprète. Si aucun des deux ne réside en Italie, il n'y a généralement pas de publication des bans en Italie ; la mairie vous indiquera la procédure exacte.</li>
<li><b>Le jour J</b> : cérémonie civile avec deux témoins majeurs et, si vous ne parlez pas italien, un interprète.</li>
</ol>
<h2>Comment je vous aide</h2>
<p>Je m'occupe des échanges avec la mairie, du calendrier des documents, des traductions et de l'interprète, et je vous accompagne le jour de la déclaration. J'officie personnellement en italien, anglais et français : votre cérémonie peut être écrite dans votre langue. Découvrez le <a href="/real-wedding-1">mariage sur une place du Salento</a> d'un couple de Los Angeles.</p>
<p class="note">Informations générales mises à jour en octobre 2026 : elles ne remplacent pas les indications officielles de votre consulat et de la mairie.</p>`,
      es: `
<h2>¿Qué tipos de ceremonia podéis elegir?</h2>
<ul>
<li><b>Ceremonia civil</b>: la celebra el funcionario del registro civil del ayuntamiento (o una persona delegada por el alcalde) en el ayuntamiento o en un lugar reconocido por él. Tiene validez legal y puede inscribirse en vuestro país.</li>
<li><b>Ceremonia religiosa</b>: una boda católica requiere los documentos de vuestra parroquia, un curso prematrimonial y la autorización de las diócesis implicadas; inscrita en el ayuntamiento, tiene también efectos civiles.</li>
<li><b>Ceremonia simbólica</b>: no tiene efectos legales, así que puede celebrarse en cualquier lugar y en vuestro idioma. Muchas parejas la combinan con una boda civil ya celebrada en su país. Más en la guía <a href="{{g:rito}}">ceremonia simbólica y civil</a>.</li>
</ul>
<h2>¿Qué documentos hacen falta para la boda civil?</h2>
<ul>
<li>El <b>nulla osta</b> (declaración de que no existen impedimentos) o el documento equivalente de vuestro país, normalmente a través de la embajada o el consulado.</li>
<li>Un <b>pasaporte</b> válido.</li>
<li>Si el ayuntamiento los pide: <b>acta de nacimiento</b>, sentencia de divorcio o acta de defunción del cónyuge anterior, con <b>apostilla</b> y <b>traducción oficial</b> al italiano.</li>
</ul>
<p>Algunos ejemplos: los ciudadanos <b>estadounidenses</b> suelen necesitar un <i>Atto Notorio</i> (ante un consulado italiano en EE. UU., válido unos 90 días) y una <i>Dichiarazione Giurata</i> (en la embajada o un consulado de EE. UU. en Italia); los <b>británicos</b> solicitan un <i>Certificate of No Impediment</i>. Los ciudadanos de la UE suelen seguir un procedimiento más sencillo. Comprobadlo siempre con vuestro consulado y con el ayuntamiento elegido.</p>
<h2>¿Cuáles son los pasos y los plazos?</h2>
<ol>
<li><b>6–12 meses antes</b>: elección de la fecha, del municipio y del lugar (para una boda civil fuera del ayuntamiento, el lugar debe estar autorizado).</li>
<li><b>3–4 meses antes</b>: solicitud de los documentos en vuestro país, apostillas y traducciones.</li>
<li><b>Unos días antes</b>: cita en el ayuntamiento para revisar los documentos y hacer la declaración de matrimonio, con testigos y, si hace falta, intérprete. Si ninguno de los dos reside en Italia, normalmente no se publican amonestaciones en Italia; el ayuntamiento os indicará el procedimiento exacto.</li>
<li><b>El día de la boda</b>: ceremonia civil con dos testigos mayores de edad y, si no habláis italiano, un intérprete.</li>
</ol>
<h2>¿Cómo os ayudo?</h2>
<p>Me encargo de la relación con el ayuntamiento, del calendario de documentos, de las traducciones y del intérprete, y os acompaño el día de la declaración. Oficio personalmente en italiano, inglés y francés. Mirad la <a href="/real-wedding-1">boda en una plaza del Salento</a> de una pareja de Los Ángeles.</p>
<p class="note">Información general actualizada en octubre de 2026: no sustituye las indicaciones oficiales de vuestro consulado y del ayuntamiento.</p>`,
    },
    related: [1, 7],
  },
  /* ======================================================================= */
  {
    id: "rito",
    img: 158,
    slug: { it: "/guida/rito-simbolico-e-rito-civile-in-puglia", en: "/guides/symbolic-ceremony-puglia", fr: "/guides/ceremonie-symbolique-pouilles", es: "/guia/ceremonia-simbolica-apulia" },
    title: {
      it: "Rito simbolico e rito civile in Puglia: differenze, luoghi e celebrante in inglese o francese",
      en: "Symbolic vs civil ceremony in Puglia: differences, venues and an English- or French-speaking celebrant",
      fr: "Cérémonie symbolique ou civile dans les Pouilles : différences, lieux et officiante francophone",
      es: "Ceremonia simbólica o civil en Apulia: diferencias, lugares y oficiante en inglés o francés",
    },
    desc: {
      it: "Cos'è il rito simbolico, quando ha valore legale il rito civile, dove si possono celebrare in Puglia e come lavora una celebrante multilingua a Lecce.",
      en: "What a symbolic ceremony is, when a civil ceremony is legally binding, where they can take place in Puglia and how a multilingual celebrant in Lecce works.",
      fr: "Qu'est-ce qu'une cérémonie symbolique, quand le mariage civil a une valeur légale, où les célébrer dans les Pouilles et comment travaille une officiante multilingue à Lecce.",
      es: "Qué es una ceremonia simbólica, cuándo tiene validez legal la civil, dónde se pueden celebrar en Apulia y cómo trabaja una oficiante multilingüe en Lecce.",
    },
    short: {
      it: "Il <b>rito civile</b> ha valore legale ma si celebra solo in municipio o in una location autorizzata dal Comune; il <b>rito simbolico</b> non ha effetti legali, quindi si può celebrare ovunque — in spiaggia, in masseria, in giardino — ed è completamente personalizzabile. Io celebro personalmente in <b>italiano, inglese e francese</b> (in spagnolo, russo e tedesco con collaboratrici), con riti come la sabbia, la luce e il tie-the-knot.",
      en: "A <b>civil ceremony</b> is legally binding but can only take place at the town hall or at a venue authorised by the town; a <b>symbolic ceremony</b> has no legal effect, so it can be held anywhere — on the beach, in a masseria, in a garden — and fully personalised. I personally officiate in <b>Italian, English and French</b> (Spanish, Russian and German with trusted partners), with rituals such as sand, light and tie-the-knot.",
      fr: "La <b>cérémonie civile</b> a une valeur légale mais se célèbre uniquement à la mairie ou dans un lieu autorisé par la commune ; la <b>cérémonie symbolique</b> n'a pas d'effet légal, elle peut donc avoir lieu partout — plage, masseria, jardin — et être entièrement personnalisée. J'officie personnellement en <b>français, anglais et italien</b> (espagnol, russe et allemand avec des collaboratrices), avec des rituels comme le sable, la lumière et le tie-the-knot.",
      es: "La <b>ceremonia civil</b> tiene validez legal pero solo se celebra en el ayuntamiento o en un lugar autorizado por él; la <b>ceremonia simbólica</b> no tiene efectos legales, así que puede celebrarse en cualquier lugar — playa, masseria, jardín — y personalizarse por completo. Oficio personalmente en <b>italiano, inglés y francés</b> (español, ruso y alemán con colaboradoras), con rituales como la arena, la luz y el tie-the-knot.",
    },
    body: {
      it: `
<h2>Che differenza c'è tra rito civile e rito simbolico?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th></th><th>Rito civile</th><th>Rito simbolico</th></tr></thead>
<tbody>
<tr><th>Valore legale</th><td>Sì</td><td>No</td></tr>
<tr><th>Dove</th><td>Municipio o location autorizzata dal Comune</td><td>Ovunque: spiaggia, masseria, giardino, piazza</td></tr>
<tr><th>Chi celebra</th><td>Ufficiale di stato civile o persona delegata dal sindaco</td><td>Una celebrante scelta da voi</td></tr>
<tr><th>Testi</th><td>Formula di legge, con letture personalizzate</td><td>Completamente su misura</td></tr>
<tr><th>Documenti</th><td>Sì (vedi la guida per stranieri)</td><td>Nessuno</td></tr>
</tbody>
</table></div>
<h2>Si può fare un rito civile valido in masseria?</h2>
<p>Sì, ma solo se la masseria o la dimora è stata individuata dal Comune come sede per i matrimoni civili (un ufficio separato di stato civile). Molte location in Puglia lo sono, molte spiagge e giardini privati no: lo verifico sempre con il Comune prima della prenotazione. Il sindaco può inoltre delegare la celebrazione a un cittadino con i requisiti di legge (art. 1 del DPR 396/2000): dove il Comune lo consente, posso celebrare io il vostro rito.</p>
<h2>Come si svolge un rito simbolico con me?</h2>
<ul>
<li><b>Incontri di preparazione</b>, anche online su Google Meet, in italiano, inglese o francese, per conoscere la vostra storia.</li>
<li>Un <b>discorso scritto su di voi</b>, letture, promesse personali e musica scelte insieme.</li>
<li><b>Riti simbolici</b>: sabbia, luce, tie-the-knot oppure tradizioni del vostro Paese.</li>
<li>Pergamene e materiali del rito sono forniti da me.</li>
</ul>
<h2>Quale scegliere?</h2>
<p>Se siete stranieri e volete evitare la burocrazia, la soluzione più semplice è sposarvi civilmente a casa e celebrare in Puglia un rito simbolico con tutti gli ospiti. Se desiderate il valore legale in Italia, scegliamo una location autorizzata o abbiniamo un breve rito civile in municipio alla festa in location. Leggete anche la guida su <a href="{{g:stranieri}}">come sposarsi in Italia da stranieri</a>.</p>`,
      en: `
<h2>What is the difference between a civil and a symbolic ceremony?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th></th><th>Civil ceremony</th><th>Symbolic ceremony</th></tr></thead>
<tbody>
<tr><th>Legal effect</th><td>Yes</td><td>No</td></tr>
<tr><th>Where</th><td>Town hall or venue authorised by the town</td><td>Anywhere: beach, masseria, garden, town square</td></tr>
<tr><th>Who officiates</th><td>Civil registrar or a person delegated by the mayor</td><td>A celebrant you choose</td></tr>
<tr><th>Words</th><td>Legal formula, with personal readings</td><td>Fully tailor-made</td></tr>
<tr><th>Paperwork</th><td>Yes (see the guide for foreigners)</td><td>None</td></tr>
</tbody>
</table></div>
<h2>Can we have a legally valid civil ceremony in a masseria?</h2>
<p>Yes, but only if the masseria or residence has been designated by the town as a venue for civil weddings (a separate registry office). Many venues in Puglia are, many beaches and private gardens are not: I always check with the town hall before you book. The mayor can also delegate the ceremony to a citizen who meets the legal requirements (art. 1 of Presidential Decree 396/2000): where the town allows it, I can officiate your ceremony myself.</p>
<h2>How does a symbolic ceremony with me work?</h2>
<ul>
<li><b>Preparation meetings</b>, online on Google Meet too, in English, French or Italian, to get to know your story.</li>
<li>A <b>speech written about you</b>, readings, personal vows and music chosen together.</li>
<li><b>Symbolic rituals</b>: sand, light, tie-the-knot or traditions from your own country.</li>
<li>Scrolls and ceremony materials are provided by me.</li>
</ul>
<h2>Which one should you choose?</h2>
<p>If you live abroad and want to avoid paperwork, the simplest option is to marry legally at home and celebrate a symbolic ceremony in Puglia with all your guests. If you want the legal wedding in Italy, we choose an authorised venue or combine a short civil ceremony at the town hall with the celebration at the venue. Read also <a href="{{g:stranieri}}">getting married in Italy as a foreigner</a>.</p>`,
      fr: `
<h2>Quelle différence entre cérémonie civile et symbolique ?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th></th><th>Cérémonie civile</th><th>Cérémonie symbolique</th></tr></thead>
<tbody>
<tr><th>Valeur légale</th><td>Oui</td><td>Non</td></tr>
<tr><th>Où</th><td>Mairie ou lieu autorisé par la commune</td><td>Partout : plage, masseria, jardin, place</td></tr>
<tr><th>Qui célèbre</th><td>Officier d'état civil ou personne déléguée par le maire</td><td>Une officiante de votre choix</td></tr>
<tr><th>Textes</th><td>Formule légale, avec lectures personnalisées</td><td>Entièrement sur mesure</td></tr>
<tr><th>Documents</th><td>Oui (voir le guide pour les étrangers)</td><td>Aucun</td></tr>
</tbody>
</table></div>
<h2>Peut-on se marier civilement dans une masseria ?</h2>
<p>Oui, mais seulement si la masseria a été désignée par la commune comme lieu de célébration des mariages civils. Beaucoup de lieux des Pouilles le sont, beaucoup de plages et de jardins privés non : je le vérifie toujours avec la mairie avant la réservation. Le maire peut aussi déléguer la célébration à un citoyen remplissant les conditions légales (art. 1 du décret 396/2000) : lorsque la commune l'autorise, je peux célébrer moi-même votre cérémonie.</p>
<h2>Comment se déroule une cérémonie symbolique avec moi ?</h2>
<ul>
<li>Des <b>rencontres de préparation</b>, aussi en ligne sur Google Meet, en français, anglais ou italien, pour connaître votre histoire.</li>
<li>Un <b>discours écrit sur vous</b>, des lectures, des vœux personnels et une musique choisis ensemble.</li>
<li>Des <b>rituels symboliques</b> : sable, lumière, tie-the-knot ou traditions de votre pays.</li>
<li>Parchemins et matériel de la cérémonie sont fournis par moi.</li>
</ul>
<h2>Que choisir ?</h2>
<p>Si vous vivez à l'étranger et souhaitez éviter les démarches, le plus simple est de vous marier civilement chez vous et de célébrer une cérémonie symbolique dans les Pouilles avec tous vos invités. Lisez aussi le guide <a href="{{g:stranieri}}">se marier en Italie quand on est étranger</a>.</p>`,
      es: `
<h2>¿Qué diferencia hay entre ceremonia civil y simbólica?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th></th><th>Ceremonia civil</th><th>Ceremonia simbólica</th></tr></thead>
<tbody>
<tr><th>Validez legal</th><td>Sí</td><td>No</td></tr>
<tr><th>Dónde</th><td>Ayuntamiento o lugar autorizado</td><td>En cualquier lugar: playa, masseria, jardín, plaza</td></tr>
<tr><th>Quién oficia</th><td>Funcionario del registro civil o persona delegada por el alcalde</td><td>Una oficiante elegida por vosotros</td></tr>
<tr><th>Textos</th><td>Fórmula legal, con lecturas personalizadas</td><td>Totalmente a medida</td></tr>
<tr><th>Documentos</th><td>Sí (ver la guía para extranjeros)</td><td>Ninguno</td></tr>
</tbody>
</table></div>
<h2>¿Se puede celebrar una boda civil válida en una masseria?</h2>
<p>Sí, pero solo si el ayuntamiento ha designado la masseria como sede para bodas civiles. Muchos lugares de Apulia lo son; muchas playas y jardines privados no: siempre lo compruebo con el ayuntamiento antes de reservar. El alcalde también puede delegar la celebración en un ciudadano que cumpla los requisitos legales (art. 1 del Decreto 396/2000): donde el ayuntamiento lo permite, puedo oficiar yo vuestra ceremonia.</p>
<h2>¿Cómo es una ceremonia simbólica conmigo?</h2>
<ul>
<li><b>Encuentros de preparación</b>, también online por Google Meet, en italiano, inglés o francés, para conocer vuestra historia.</li>
<li>Un <b>discurso escrito sobre vosotros</b>, lecturas, votos personales y música elegidos juntos.</li>
<li><b>Rituales simbólicos</b>: arena, luz, tie-the-knot o tradiciones de vuestro país.</li>
<li>Los pergaminos y materiales de la ceremonia los aporto yo.</li>
</ul>
<h2>¿Cuál elegir?</h2>
<p>Si vivís en el extranjero y queréis evitar trámites, lo más sencillo es casaros por lo civil en casa y celebrar en Apulia una ceremonia simbólica con todos vuestros invitados. Leed también la guía <a href="{{g:stranieri}}">casarse en Italia siendo extranjero</a>.</p>`,
    },
    related: [7, 4],
  },
  /* ======================================================================= */
  {
    id: "periodo",
    img: 166,
    slug: { it: "/guida/periodo-migliore-per-sposarsi-in-puglia", en: "/guides/best-time-to-get-married-in-puglia", fr: "/guides/meilleure-periode-mariage-pouilles", es: "/guia/mejor-epoca-boda-apulia" },
    title: {
      it: "Il periodo migliore per sposarsi in Puglia e nel Salento, mese per mese",
      en: "The best time to get married in Puglia and Salento, month by month",
      fr: "La meilleure période pour se marier dans les Pouilles et le Salento, mois par mois",
      es: "La mejor época para casarse en Apulia y el Salento, mes a mes",
    },
    desc: {
      it: "Meteo, luce, prezzi e disponibilità da aprile a ottobre: quando conviene sposarsi in Puglia e nel Salento secondo una wedding planner di Lecce.",
      en: "Weather, light, prices and availability from April to October: when to get married in Puglia and Salento, according to a Lecce wedding planner.",
      fr: "Météo, lumière, prix et disponibilités d'avril à octobre : quand se marier dans les Pouilles et le Salento selon une wedding planner de Lecce.",
      es: "Clima, luz, precios y disponibilidad de abril a octubre: cuándo casarse en Apulia y el Salento según una wedding planner de Lecce.",
    },
    short: {
      it: "I mesi migliori per sposarsi nel Salento sono <b>maggio, giugno e settembre</b>: giornate calde ma non torride, serate fresche e tramonti lunghi. <b>Luglio e agosto</b> sono ideali per feste serali sul mare ma sono caldi e molto richiesti. <b>Fine settembre e ottobre</b> offrono luce bellissima, meno turisti e prezzi più morbidi.",
      en: "The best months to marry in Salento are <b>May, June and September</b>: warm but not scorching days, cooler evenings and long sunsets. <b>July and August</b> are ideal for evening parties by the sea but are hot and in high demand. <b>Late September and October</b> bring beautiful light, fewer tourists and gentler prices.",
      fr: "Les meilleurs mois pour se marier dans le Salento sont <b>mai, juin et septembre</b> : journées chaudes sans excès, soirées fraîches et longs couchers de soleil. <b>Juillet et août</b> sont idéaux pour les fêtes du soir au bord de la mer, mais il fait chaud et la demande est forte. <b>Fin septembre et octobre</b> offrent une belle lumière, moins de touristes et des prix plus doux.",
      es: "Los mejores meses para casarse en el Salento son <b>mayo, junio y septiembre</b>: días cálidos pero no tórridos, noches frescas y atardeceres largos. <b>Julio y agosto</b> son ideales para fiestas nocturnas junto al mar, pero hace calor y hay mucha demanda. <b>Finales de septiembre y octubre</b> ofrecen una luz preciosa, menos turistas y precios más suaves.",
    },
    body: {
      it: `
<h2>Com'è il clima mese per mese?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th>Mese</th><th>Clima indicativo a Lecce</th><th>Per il matrimonio</th></tr></thead>
<tbody>
<tr><th>Aprile</th><td>Massime intorno ai 19–20 °C, qualche pioggia</td><td>Primavera in fiore, serve sempre un piano B al coperto</td></tr>
<tr><th>Maggio</th><td>Massime intorno ai 22–24 °C, tra i mesi più asciutti</td><td>Ottimo per riti all'aperto e foto nei campi</td></tr>
<tr><th>Giugno</th><td>Massime intorno ai 27–28 °C, giornate lunghissime</td><td>Il mese più richiesto: prenotate presto</td></tr>
<tr><th>Luglio e agosto</th><td>Massime spesso oltre i 30 °C</td><td>Feste serali sul mare; cerimonia nel tardo pomeriggio</td></tr>
<tr><th>Settembre</th><td>Massime intorno ai 26–27 °C, serate miti</td><td>Il mio preferito: luce dorata e mare ancora caldo</td></tr>
<tr><th>Ottobre</th><td>Massime intorno ai 22–23 °C, piogge in aumento</td><td>Matrimoni intimi, prezzi più morbidi, piano B obbligatorio</td></tr>
</tbody>
</table></div>
<p>Valori medi indicativi: il meteo di un singolo giorno può essere diverso.</p>
<h2>A che ora fare la cerimonia?</h2>
<p>In estate il sole tramonta intorno alle 20:15 a giugno e verso le 19:00 a metà settembre. Per luce morbida e meno caldo consiglio una cerimonia all'aperto 2–3 ore prima del tramonto, con l'aperitivo all'ora d'oro. Sulla costa ionica (Gallipoli, Porto Cesareo) il sole tramonta sul mare; su quella adriatica (Otranto) è perfetta l'alba.</p>
<h2>Alta stagione o bassa stagione?</h2>
<ul>
<li><b>Maggio, giugno e settembre</b>: massima disponibilità di bel tempo, ma location e alberghi vanno prenotati anche 12–18 mesi prima.</li>
<li><b>Agosto</b>: intorno a Ferragosto (15 agosto) strade, spiagge e alberghi sono pienissimi; ottimo per una festa, più complesso per gli ospiti.</li>
<li><b>Aprile e ottobre</b>: prezzi più morbidi e più scelta di date, anche nei giorni feriali.</li>
</ul>
<p>Per capire dove festeggiare in ogni stagione leggete la guida <a href="{{g:location}}">dove sposarsi nel Salento</a>.</p>`,
      en: `
<h2>What is the weather like month by month?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th>Month</th><th>Typical weather in Lecce</th><th>For your wedding</th></tr></thead>
<tbody>
<tr><th>April</th><td>Highs around 19–20 °C, some rain</td><td>Spring in bloom; always plan an indoor option</td></tr>
<tr><th>May</th><td>Highs around 22–24 °C, among the driest months</td><td>Great for outdoor ceremonies and countryside photos</td></tr>
<tr><th>June</th><td>Highs around 27–28 °C, very long days</td><td>The most requested month: book early</td></tr>
<tr><th>July and August</th><td>Highs often above 30 °C</td><td>Evening parties by the sea; late-afternoon ceremony</td></tr>
<tr><th>September</th><td>Highs around 26–27 °C, mild evenings</td><td>My favourite: golden light and a still-warm sea</td></tr>
<tr><th>October</th><td>Highs around 22–23 °C, more rain</td><td>Intimate weddings, gentler prices, plan B essential</td></tr>
</tbody>
</table></div>
<p>Indicative averages: the weather on a single day can differ.</p>
<h2>What time should the ceremony be?</h2>
<p>The sun sets around 8:15 pm in June and around 7:00 pm in mid-September. For soft light and less heat I suggest an outdoor ceremony 2–3 hours before sunset, with the aperitif at golden hour. On the Ionian coast (Gallipoli, Porto Cesareo) the sun sets over the sea; on the Adriatic side (Otranto) sunrise is the magic moment.</p>
<h2>High season or shoulder season?</h2>
<ul>
<li><b>May, June and September</b>: the best chance of good weather, but venues and hotels should be booked 12–18 months ahead.</li>
<li><b>August</b>: around Ferragosto (15 August) roads, beaches and hotels are packed; great for a party, harder for guests.</li>
<li><b>April and October</b>: gentler prices and more choice of dates, weekdays included.</li>
</ul>
<p>To decide where to celebrate in each season, read <a href="{{g:location}}">where to get married in Salento</a>.</p>`,
      fr: `
<h2>Quel temps fait-il mois par mois ?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th>Mois</th><th>Climat indicatif à Lecce</th><th>Pour le mariage</th></tr></thead>
<tbody>
<tr><th>Avril</th><td>Maximales vers 19–20 °C, quelques pluies</td><td>Printemps fleuri ; prévoir une solution couverte</td></tr>
<tr><th>Mai</th><td>Maximales vers 22–24 °C, parmi les mois les plus secs</td><td>Idéal pour les cérémonies en plein air</td></tr>
<tr><th>Juin</th><td>Maximales vers 27–28 °C, journées très longues</td><td>Le mois le plus demandé : réservez tôt</td></tr>
<tr><th>Juillet et août</th><td>Maximales souvent au-delà de 30 °C</td><td>Fêtes du soir au bord de la mer ; cérémonie en fin d'après-midi</td></tr>
<tr><th>Septembre</th><td>Maximales vers 26–27 °C, soirées douces</td><td>Mon préféré : lumière dorée et mer encore chaude</td></tr>
<tr><th>Octobre</th><td>Maximales vers 22–23 °C, pluies en hausse</td><td>Mariages intimes, prix plus doux, plan B indispensable</td></tr>
</tbody>
</table></div>
<p>Moyennes indicatives : la météo d'un jour donné peut être différente.</p>
<h2>À quelle heure la cérémonie ?</h2>
<p>Le soleil se couche vers 20h15 en juin et vers 19h00 à la mi-septembre. Pour une lumière douce et moins de chaleur, je conseille une cérémonie en plein air 2 à 3 heures avant le coucher du soleil. Sur la côte ionienne (Gallipoli, Porto Cesareo) le soleil se couche sur la mer ; sur la côte adriatique (Otranto), c'est le lever du soleil qui est magique.</p>
<h2>Haute ou moyenne saison ?</h2>
<ul>
<li><b>Mai, juin et septembre</b> : les meilleures chances de beau temps, mais lieux et hôtels se réservent 12 à 18 mois avant.</li>
<li><b>Août</b> : autour du 15 août, routes, plages et hôtels sont bondés.</li>
<li><b>Avril et octobre</b> : prix plus doux et plus de choix de dates, y compris en semaine.</li>
</ul>
<p>Pour choisir où célébrer, lisez le guide <a href="{{g:location}}">où se marier dans le Salento</a>.</p>`,
      es: `
<h2>¿Qué tiempo hace mes a mes?</h2>
<div class="tbl"><table class="cmp">
<thead><tr><th>Mes</th><th>Clima orientativo en Lecce</th><th>Para la boda</th></tr></thead>
<tbody>
<tr><th>Abril</th><td>Máximas de unos 19–20 °C, algo de lluvia</td><td>Primavera en flor; prever siempre un espacio cubierto</td></tr>
<tr><th>Mayo</th><td>Máximas de unos 22–24 °C, de los meses más secos</td><td>Ideal para ceremonias al aire libre</td></tr>
<tr><th>Junio</th><td>Máximas de unos 27–28 °C, días larguísimos</td><td>El mes más solicitado: reservad pronto</td></tr>
<tr><th>Julio y agosto</th><td>Máximas a menudo por encima de 30 °C</td><td>Fiestas nocturnas junto al mar; ceremonia al final de la tarde</td></tr>
<tr><th>Septiembre</th><td>Máximas de unos 26–27 °C, noches templadas</td><td>Mi favorito: luz dorada y mar aún cálido</td></tr>
<tr><th>Octubre</th><td>Máximas de unos 22–23 °C, más lluvia</td><td>Bodas íntimas, precios más suaves, plan B imprescindible</td></tr>
</tbody>
</table></div>
<p>Medias orientativas: el tiempo de un día concreto puede ser distinto.</p>
<h2>¿A qué hora hacer la ceremonia?</h2>
<p>El sol se pone hacia las 20:15 en junio y hacia las 19:00 a mediados de septiembre. Para una luz suave y menos calor aconsejo una ceremonia al aire libre 2–3 horas antes del atardecer. En la costa jónica (Gallipoli, Porto Cesareo) el sol se pone sobre el mar; en la adriática (Otranto) lo mágico es el amanecer.</p>
<h2>¿Temporada alta o media?</h2>
<ul>
<li><b>Mayo, junio y septiembre</b>: más probabilidades de buen tiempo, pero lugares y hoteles se reservan con 12–18 meses de antelación.</li>
<li><b>Agosto</b>: en torno a Ferragosto (15 de agosto) carreteras, playas y hoteles están llenos.</li>
<li><b>Abril y octubre</b>: precios más suaves y más fechas disponibles, también entre semana.</li>
</ul>
<p>Para decidir dónde celebrar, leed la guía <a href="{{g:location}}">dónde casarse en el Salento</a>.</p>`,
    },
    related: [2, 6],
  },
  /* ======================================================================= */
  {
    id: "location",
    img: 151,
    slug: { it: "/guida/dove-sposarsi-nel-salento", en: "/guides/where-to-get-married-in-salento", fr: "/guides/ou-se-marier-dans-le-salento", es: "/guia/donde-casarse-en-el-salento" },
    title: {
      it: "Dove sposarsi nel Salento: masserie, Lecce barocca, mare, piazze e cave",
      en: "Where to get married in Salento: masserie, Baroque Lecce, the sea, town squares and quarries",
      fr: "Où se marier dans le Salento : masserie, Lecce baroque, mer, places et carrières",
      es: "Dónde casarse en el Salento: masserie, la Lecce barroca, el mar, plazas y canteras",
    },
    desc: {
      it: "Le location più belle per un matrimonio nel Salento spiegate da una wedding planner di Lecce: masserie, chiese barocche, mare ionico e adriatico, piazze e cave, con distanze e consigli.",
      en: "The most beautiful wedding settings in Salento explained by a Lecce wedding planner: masserie, Baroque churches, the Ionian and Adriatic sea, town squares and quarries, with distances and tips.",
      fr: "Les plus beaux cadres de mariage dans le Salento expliqués par une wedding planner de Lecce : masserie, églises baroques, mers Ionienne et Adriatique, places et carrières.",
      es: "Los escenarios más bonitos para una boda en el Salento explicados por una wedding planner de Lecce: masserie, iglesias barrocas, mar Jónico y Adriático, plazas y canteras.",
    },
    short: {
      it: "Nel Salento potete sposarvi in <b>masseria</b> (la scelta più amata, tra ulivi e pietra), in una <b>chiesa barocca di Lecce</b>, <b>sul mare</b> — tramonti sullo Ionio a Gallipoli, scogliere adriatiche a Otranto e Santa Maria di Leuca — in una <b>piazza di paese</b> o persino in una <b>cava di pietra</b>. Lecce è il punto di partenza ideale: l'aeroporto di Brindisi è a circa 40 km.",
      en: "In Salento you can marry in a <b>masseria</b> (the favourite choice, among olive trees and stone), in a <b>Baroque church in Lecce</b>, <b>by the sea</b> — Ionian sunsets in Gallipoli, Adriatic cliffs in Otranto and Santa Maria di Leuca — in a <b>town square</b> or even in a <b>stone quarry</b>. Lecce is the ideal base: Brindisi airport is about 40 km away.",
      fr: "Dans le Salento, vous pouvez vous marier dans une <b>masseria</b> (le choix préféré, entre oliviers et pierre), dans une <b>église baroque de Lecce</b>, <b>au bord de la mer</b> — couchers de soleil sur la mer Ionienne à Gallipoli, falaises adriatiques à Otranto et Santa Maria di Leuca — sur une <b>place de village</b> ou même dans une <b>carrière de pierre</b>. Lecce est la base idéale : l'aéroport de Brindisi est à environ 40 km.",
      es: "En el Salento podéis casaros en una <b>masseria</b> (la opción favorita, entre olivos y piedra), en una <b>iglesia barroca de Lecce</b>, <b>junto al mar</b> — atardeceres en el Jónico en Gallipoli, acantilados adriáticos en Otranto y Santa Maria di Leuca — en una <b>plaza de pueblo</b> o incluso en una <b>cantera de piedra</b>. Lecce es la base ideal: el aeropuerto de Brindisi está a unos 40 km.",
    },
    body: {
      it: `
<h2>Masseria: il matrimonio pugliese per eccellenza</h2>
<p>Le masserie sono antiche fattorie fortificate in pietra, circondate da ulivi e vigneti. Offrono spazi all'aperto per cerimonia e cena, spesso camere per gli sposi e gli ospiti e la possibilità di festeggiare tutto il weekend. Alcune sono sede autorizzata per il rito civile. Guardate le <a href="/real-wedding-7">nozze in masseria</a> di una coppia lituana, allestite con rose rampicanti e tanto verde.</p>
<h2>Lecce barocca e le sue chiese</h2>
<p>Lecce, la "Firenze del Sud", è perfetta per un matrimonio religioso tra facciate barocche in pietra leccese, con la banda che accoglie gli sposi all'uscita e il ricevimento in una dimora o in campagna a pochi minuti. Ecco <a href="/real-wedding-8">il sì in chiesa e una notte di luci</a>.</p>
<h2>Sul mare: Ionio o Adriatico?</h2>
<ul>
<li><b>Costa ionica</b> (Gallipoli, Porto Cesareo, Santa Maria al Bagno): spiagge e tramonti sul mare, ideali per ricevimenti serali. Gallipoli è a circa 40 km da Lecce.</li>
<li><b>Costa adriatica</b> (Otranto, Castro, Santa Cesarea): scogliere, torri costiere e acqua cristallina. Otranto è a circa 45 km da Lecce.</li>
<li><b>Santa Maria di Leuca</b>, dove i due mari si incontrano, a circa 70 km.</li>
</ul>
<p>Un rito sulla spiaggia è di solito simbolico; per le foto sulle scogliere guardate <a href="/real-wedding-2">tra Lecce e il mare</a>.</p>
<h2>Piazze, cave e luoghi insoliti</h2>
<p>Per una coppia di Los Angeles ho allestito una vera piazza di paese, con l'autorizzazione del sindaco, la pizzica e le bancarelle di prodotti tipici: <a href="/real-wedding-1">matrimonio in piazza nel Salento</a>. Le antiche cave di pietra, illuminate di sera, sono un'altra scenografia unica: <a href="/real-wedding-3">magia nella cava</a>.</p>
<h2>Consigli pratici</h2>
<ul>
<li>Tenete cerimonia e ricevimento a meno di 30 minuti di distanza e prevedete navette per gli ospiti.</li>
<li>Prenotate alloggi vicino alla location, soprattutto in luglio e agosto.</li>
<li>Per gli eventi all'aperto chiedete sempre il piano B al coperto.</li>
<li>Se volete il rito civile in location, verificate prima che sia autorizzata dal Comune.</li>
</ul>`,
      en: `
<h2>Masseria: the quintessential Puglia wedding</h2>
<p>Masserie are old fortified stone farmhouses surrounded by olive groves and vineyards. They offer outdoor spaces for ceremony and dinner, often rooms for the couple and guests, and the chance to celebrate all weekend. Some are authorised venues for civil ceremonies. See the <a href="/real-wedding-7">masseria wedding</a> of a Lithuanian couple, styled with climbing roses and lots of greenery.</p>
<h2>Baroque Lecce and its churches</h2>
<p>Lecce, the “Florence of the South”, is perfect for a religious wedding among Baroque façades of local stone, with the band welcoming the newlyweds outside and the reception in a historic residence or in the countryside a few minutes away. Here is <a href="/real-wedding-8">a church wedding and a night of lights</a>.</p>
<h2>By the sea: Ionian or Adriatic?</h2>
<ul>
<li><b>Ionian coast</b> (Gallipoli, Porto Cesareo, Santa Maria al Bagno): beaches and sunsets over the sea, ideal for evening receptions. Gallipoli is about 40 km from Lecce.</li>
<li><b>Adriatic coast</b> (Otranto, Castro, Santa Cesarea): cliffs, coastal towers and crystal-clear water. Otranto is about 45 km from Lecce.</li>
<li><b>Santa Maria di Leuca</b>, where the two seas meet, about 70 km away.</li>
</ul>
<p>A beach ceremony is usually symbolic; for portraits on the cliffs see <a href="/real-wedding-2">between Lecce and the sea</a>.</p>
<h2>Town squares, quarries and unusual places</h2>
<p>For a couple from Los Angeles I set up a real village square, with the mayor's permission, pizzica dancing and stalls of local food: <a href="/real-wedding-1">wedding in a Salento town square</a>. Old stone quarries lit up at night are another unique setting: <a href="/real-wedding-3">magic in the quarry</a>.</p>
<h2>Practical tips</h2>
<ul>
<li>Keep ceremony and reception within 30 minutes of each other and plan shuttles for guests.</li>
<li>Book accommodation near the venue, especially in July and August.</li>
<li>For outdoor events always ask for a covered plan B.</li>
<li>If you want a civil ceremony at the venue, first check that it is authorised by the town.</li>
</ul>`,
      fr: `
<h2>La masseria : le mariage des Pouilles par excellence</h2>
<p>Les masserie sont d'anciennes fermes fortifiées en pierre, entourées d'oliviers et de vignes. Elles offrent des espaces extérieurs pour la cérémonie et le dîner, souvent des chambres pour les mariés et les invités, et la possibilité de fêter tout le week-end. Découvrez le <a href="/real-wedding-7">mariage en masseria</a> d'un couple lituanien.</p>
<h2>Lecce baroque et ses églises</h2>
<p>Lecce, la « Florence du Sud », est parfaite pour un mariage religieux entre façades baroques en pierre locale, avec la fanfare qui accueille les mariés à la sortie. Voici <a href="/real-wedding-8">un oui à l'église et une nuit de lumières</a>.</p>
<h2>Au bord de la mer : Ionienne ou Adriatique ?</h2>
<ul>
<li><b>Côte ionienne</b> (Gallipoli, Porto Cesareo) : plages et couchers de soleil sur la mer. Gallipoli est à environ 40 km de Lecce.</li>
<li><b>Côte adriatique</b> (Otranto, Castro, Santa Cesarea) : falaises, tours côtières et eaux cristallines. Otranto est à environ 45 km.</li>
<li><b>Santa Maria di Leuca</b>, où les deux mers se rencontrent, à environ 70 km.</li>
</ul>
<p>Une cérémonie sur la plage est généralement symbolique ; pour des portraits sur les falaises, voyez <a href="/real-wedding-2">entre Lecce et la mer</a>.</p>
<h2>Places, carrières et lieux insolites</h2>
<p>Pour un couple de Los Angeles, j'ai installé une véritable place de village, avec l'autorisation du maire, la pizzica et des stands de produits locaux : <a href="/real-wedding-1">mariage sur une place du Salento</a>. Les anciennes carrières de pierre illuminées le soir sont un autre décor unique : <a href="/real-wedding-3">magie dans la carrière</a>.</p>
<h2>Conseils pratiques</h2>
<ul>
<li>Gardez cérémonie et réception à moins de 30 minutes l'une de l'autre et prévoyez des navettes.</li>
<li>Réservez les hébergements près du lieu, surtout en juillet et août.</li>
<li>Pour les événements en plein air, prévoyez toujours un plan B couvert.</li>
</ul>`,
      es: `
<h2>La masseria: la boda apulense por excelencia</h2>
<p>Las masserie son antiguas granjas fortificadas de piedra, rodeadas de olivos y viñedos. Ofrecen espacios al aire libre para la ceremonia y la cena, a menudo habitaciones para los novios y los invitados, y la posibilidad de celebrar todo el fin de semana. Mirad la <a href="/real-wedding-7">boda en masseria</a> de una pareja lituana.</p>
<h2>La Lecce barroca y sus iglesias</h2>
<p>Lecce, la «Florencia del Sur», es perfecta para una boda religiosa entre fachadas barrocas de piedra local, con la banda recibiendo a los novios a la salida. Aquí está <a href="/real-wedding-8">el sí en la iglesia y una noche de luces</a>.</p>
<h2>Junto al mar: ¿Jónico o Adriático?</h2>
<ul>
<li><b>Costa jónica</b> (Gallipoli, Porto Cesareo): playas y atardeceres sobre el mar. Gallipoli está a unos 40 km de Lecce.</li>
<li><b>Costa adriática</b> (Otranto, Castro, Santa Cesarea): acantilados, torres costeras y agua cristalina. Otranto está a unos 45 km.</li>
<li><b>Santa Maria di Leuca</b>, donde se unen los dos mares, a unos 70 km.</li>
</ul>
<p>Una ceremonia en la playa suele ser simbólica; para fotos en los acantilados mirad <a href="/real-wedding-2">entre Lecce y el mar</a>.</p>
<h2>Plazas, canteras y lugares insólitos</h2>
<p>Para una pareja de Los Ángeles preparé una auténtica plaza de pueblo, con permiso del alcalde, pizzica y puestos de productos típicos: <a href="/real-wedding-1">boda en una plaza del Salento</a>. Las antiguas canteras de piedra iluminadas por la noche son otro escenario único: <a href="/real-wedding-3">magia en la cantera</a>.</p>
<h2>Consejos prácticos</h2>
<ul>
<li>Mantened ceremonia y banquete a menos de 30 minutos y prever autobuses para los invitados.</li>
<li>Reservad alojamiento cerca del lugar, sobre todo en julio y agosto.</li>
<li>Para eventos al aire libre, pedid siempre un plan B cubierto.</li>
</ul>`,
    },
    related: [7, 1],
  },
];

module.exports = { hub, guides, UPDATED };

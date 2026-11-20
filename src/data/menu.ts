import type { MenuCategory, MenuExtra, MenuItem, QualityPillar, Testimonial } from '../types/order';

export const WHATSAPP_NUMBER = '5562999999999';
export const WHATSAPP_DISPLAY = '(62) 99999-9999';
export const DELIVERY_FEE = 5.0;

export const HERO_IMAGE = '/src/assets/images/hero_euro_burger_1795212159360.jpg';

export const MENU_CATEGORIES: MenuCategory[] = [
  'Todos os Itens',
  'Burgers & Smash',
  'Linha Especial & Brasa',
  'Porções & Acompanhamentos',
  'Bebidas & Geladas',
];

export const BURGER_EXTRAS: MenuExtra[] = [
  { id: 'bacon-extra', name: 'Bacon Artesanal Curado Extra', price: 6.0 },
  { id: 'cheddar-extra', name: 'Duplo Cheddar Inglês Extra', price: 5.0 },
  { id: 'blend-extra', name: 'Hambúrguer 180g na Brasa Extra', price: 12.0 },
  { id: 'maionese-extra', name: 'Potinho Maionese Defumada da Casa', price: 3.5 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'euro-burger-especial',
    name: 'Euro Burger Especial',
    category: 'Linha Especial & Brasa',
    description:
      'Pão brioche selado na manteiga, blend 180g grelhado na brasa, queijo gouda maçaricado, bacon caramelizado e maionese secreta da casa.',
    fullDescription:
      'O carro-chefe da nossa casa no Jardim Nova Esperança. Blend 100% bovino de 180g selado na brasa de alta temperatura, coberto por queijo gouda derretido e maçaricado na hora, tiras de bacon caramelizado e nossa maionese artesanal secreta no pão brioche tostado na manteiga da terra.',
    price: 36.9,
    unitLabel: 'Preço individual',
    image: '/src/assets/images/menu_euro_burger_especial_1795212159597.jpg',
    badge: 'Mais Pedido',
    isBurger: true,
    prepTime: '18–25 min',
  },
  {
    id: 'smash-duplo-cheddar',
    name: 'Smash Duplo Cheddar',
    category: 'Burgers & Smash',
    description:
      'Dois smashs de 90g ultra prensados com crostinha crocante, duplo cheddar inglês derretido, cebola roxa e picles artesanal.',
    fullDescription:
      'Técnica autêntica de smash na chapa de ferro: dois discos de 90g prensados até formar a crosta caramelizada irresistível, intercalados com duplo cheddar inglês cremoso, cebola roxa crocante, picles artesanal da casa e pão brioche macio.',
    price: 29.9,
    unitLabel: 'Preço individual',
    image: '/src/assets/images/menu_smash_duplo_cheddar_1795212158682.jpg',
    badge: 'Favorito da Galera',
    isBurger: true,
    prepTime: '15–20 min',
  },
  {
    id: 'bacon-supreme-euro',
    name: 'Bacon Supreme Euro',
    category: 'Linha Especial & Brasa',
    description:
      'Blend 180g na brasa de lenha frutífera, tiras generosas de bacon artesanal curado, queijo prato derretido e barbecue de café.',
    fullDescription:
      'Defumado de verdade na brasa de lenha frutífera. Leva blend bovino suculento de 180g, fatias espessas de bacon artesanal curado na casa, queijo prato derretido e nosso exclusivo molho barbecue artesanal reduzido com café especial.',
    price: 38.5,
    unitLabel: 'Preço individual',
    image: '/src/assets/images/menu_bacon_supreme_1795212158843.jpg',
    badge: 'Novidade',
    isBurger: true,
    prepTime: '20–25 min',
  },
  {
    id: 'euro-chicken-crispy',
    name: 'Euro Chicken Crispy',
    category: 'Burgers & Smash',
    description:
      'Sobrecoxa desossada marinada em ervas finas e empanada crocante, salada coleslaw roxa, picles e maionese de limão siciliano.',
    fullDescription:
      'Crocância sonora por fora e suculência por dentro: sobrecoxa marinada por 12 horas em leitelho e ervas finas, empanada na hora, servida com coleslaw de repolho roxo, picles crocante e maionese fresca de limão siciliano.',
    price: 31.0,
    unitLabel: 'Preço individual',
    image: '/src/assets/images/menu_chicken_crispy_1795212159069.jpg',
    isBurger: true,
    prepTime: '18–22 min',
  },
  {
    id: 'batata-rustica-alecrim',
    name: 'Batata Rústica com Alecrim',
    category: 'Porções & Acompanhamentos',
    description:
      'Cortes rústicos crocantes por fora e macios por dentro, temperados com sal de parrilla, alecrim fresco e aioli de alho assado.',
    fullDescription:
      'Batatas selecionadas cortadas em gomos com casca, pré-cozidas e fritas em dupla imersão para garantir máxima crocância. Finalizadas com flor de sal de parrilla, ramos de alecrim fresco e acompanhadas de aioli artesanal de alho assado.',
    price: 22.0,
    unitLabel: 'Porção serve 2',
    image: '/src/assets/images/menu_batata_rustica_1795212158590.jpg',
    badge: 'Crocante',
    isBurger: false,
    prepTime: '12–15 min',
  },
  {
    id: 'euro-smash-salad',
    name: 'Euro Smash Salad',
    category: 'Burgers & Smash',
    description:
      'Smash 100g bem prensado, queijo estepe cremoso, alface americana super fresca, tomate italiano e molho especial Euro.',
    fullDescription:
      'O clássico elevado à perfeição: smash de 100g com bordas crocantes, queijo estepe derretido, folhas selecionadas de alface americana crocante, fatias de tomate italiano maduro e nosso molho especial Euro no brioche selado.',
    price: 26.9,
    unitLabel: 'Preço individual',
    image: '/src/assets/images/menu_smash_salad_1795212158600.jpg',
    isBurger: true,
    prepTime: '15–18 min',
  },
  {
    id: 'mini-pasteis-costela',
    name: 'Mini Pastéis de Costela',
    category: 'Porções & Acompanhamentos',
    description:
      '6 unidades de massa super sequinha e estufada, recheada com costela bovina desfiada por 12 horas e requeijão cremoso.',
    fullDescription:
      'Entrada campeã da casa! Seis mini pastéis artesanais de massa leve, crocante e sequinha, generosamente recheados com costela bovina assada lentamente por 12 horas na cerveja preta e requeijão cremoso de corte. Acompanha molho de ervas.',
    price: 24.0,
    unitLabel: '6 Unidades',
    image: '/src/assets/images/menu_mini_pasteis_1795212159027.jpg',
    badge: 'Petisco Top',
    isBurger: false,
    prepTime: '12–15 min',
  },
  {
    id: 'soda-artesanal-frutas',
    name: 'Soda Artesanal de Frutas',
    category: 'Bebidas & Geladas',
    description:
      'Redução caseira de amoras, morangos e framboesas, água gaseificada premium e gelo cristalino com toque de hortelã.',
    fullDescription:
      'Refrescância pura para equilibrar o sabor da brasa. Preparada na hora com calda artesanal reduzida de amoras, morangos e framboesas frescas, água com gás de alta carbonatação, gelo cristalino e folhas de hortelã.',
    price: 9.9,
    unitLabel: 'Copo 400ml',
    image: '/src/assets/images/menu_soda_frutas_1795212158746.jpg',
    isBurger: false,
    prepTime: '5 min',
  },
];

export const QUALITY_PILLARS: QualityPillar[] = [
  {
    id: 'blend',
    title: 'Blend 100% Bovino Selecionado',
    description:
      'Carne moída todos os dias, sem adição de conservantes ou soja. Apenas cortes selecionados com percentual perfeito de gordura para máxima suculência.',
    icon: 'flame',
    accent: 'ember',
  },
  {
    id: 'brioche',
    title: 'Pães Brioche Especiais',
    description:
      'Fermentação lenta natural, textura macia com miolo que não desmancha, selados generosamente com manteiga pura na chapa quente.',
    icon: 'bread',
    accent: 'gold',
  },
  {
    id: 'atendimento',
    title: 'Atendimento no Jardim Nova Esperança',
    description:
      'Ambiente noturno descontraído, acolhedor e familiar em Goiânia. Atendimento liderado com carinho e agilidade para sua melhor noite.',
    icon: 'store',
    accent: 'ember',
  },
  {
    id: 'embalagens',
    title: 'Embalagens Térmicas Exclusivas',
    description:
      'Tecnologia que mantém o burger quente e o pão arejado, garantindo que a crocância e o queijo cheguem perfeitos no seu delivery.',
    icon: 'truck',
    accent: 'sand',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rodrigo',
    initials: 'RC',
    name: 'Rodrigo Carvalho',
    role: 'Local Guide · Goiânia',
    rating: 5,
    quote:
      '"Melhor hambúrguer do Jardim Nova Esperança, sem sombra de dúvidas! O ponto da carne na brasa é impecável e a maionese defumada dá um toque único. Virei cliente fiel toda sexta-feira."',
  },
  {
    id: 'larissa',
    initials: 'LS',
    name: 'Larissa Santana',
    role: 'Cliente Verificada · Google',
    rating: 5,
    quote:
      '"Atendimento espetacular das meninas! O pão chega muito macio, o queijo realmente derretido e a porção de pastéis de costela é coisa de outro mundo. Recomendo de olhos fechados!"',
  },
  {
    id: 'mateus',
    initials: 'MM',
    name: 'Mateus Moreira',
    role: 'Pedido via Delivery',
    rating: 5,
    quote:
      '"Pedi pelo WhatsApp e foi super simples e rápido. O combo chegou antes do tempo estimado, quente e sem suar o pão. O Smash Duplo Cheddar é sensacional!"',
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

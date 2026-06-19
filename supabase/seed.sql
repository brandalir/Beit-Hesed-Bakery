-- Beit Hesed Bakery - initial products
-- Run this after supabase/schema.sql.

insert into public.products
  (name, slug, description, category, occasion, price, image_url, is_featured, is_available, prep_time)
values
  (
    'Torta Beit Hesed',
    'torta-beit-hesed',
    'Bizcocho humedo de vainilla, crema de queso, frutos rojos y decoracion artesanal.',
    'Tortas',
    'Cumpleanos',
    38.00,
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80',
    true,
    true,
    '48 horas'
  ),
  (
    'Caja de Macarons',
    'caja-de-macarons',
    'Seleccion de macarons con sabores de pistacho, frambuesa, chocolate y vainilla.',
    'Bocaditos',
    'Regalo',
    18.00,
    'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=900&q=80',
    true,
    true,
    '24 horas'
  ),
  (
    'Croissant de Almendra',
    'croissant-de-almendra',
    'Masa laminada con mantequilla, crema de almendra tostada y azucar glass.',
    'Panaderia',
    'Desayuno',
    4.50,
    'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=900&q=80',
    false,
    true,
    '12 horas'
  ),
  (
    'Mini Tartaletas',
    'mini-tartaletas',
    'Base crocante, crema pastelera sedosa y frutas frescas de temporada.',
    'Postres',
    'Evento',
    22.00,
    'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=900&q=80',
    true,
    true,
    '24 horas'
  ),
  (
    'Cupcakes de Chocolate',
    'cupcakes-de-chocolate',
    'Cupcakes de cacao intenso con buttercream de chocolate y acabado minimalista.',
    'Postres',
    'Cumpleanos',
    16.00,
    'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80',
    false,
    true,
    '24 horas'
  ),
  (
    'Brioche Artesanal',
    'brioche-artesanal',
    'Pan brioche suave, dorado y aromatico, ideal para brunch o mesas dulces.',
    'Panaderia',
    'Desayuno',
    9.00,
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    false,
    true,
    '24 horas'
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  occasion = excluded.occasion,
  price = excluded.price,
  image_url = excluded.image_url,
  is_featured = excluded.is_featured,
  is_available = excluded.is_available,
  prep_time = excluded.prep_time;

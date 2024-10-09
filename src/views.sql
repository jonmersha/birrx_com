create view product_full as
SELECT 
    p.product_id, 
    p.category_id,
    p.product_name, 
    p.description, 
    p.price, 
    p.stock, 
    p.image_url, 
    p.created_at,
    p.updated_at,
    p.merchant_id,
    COUNT(pl.like_id) AS total_likes, 
    COUNT(pv.view_id) AS total_views
FROM 
    products p
LEFT JOIN 
    product_likes pl ON p.product_id = pl.product_id
LEFT JOIN 
    product_views pv ON p.product_id = pv.product_id
GROUP BY 
    p.product_id;



create view promotion_view as SELECT 
    p.promotion_id,
    p.title AS promotion_title,
    p.description AS promotion_description,
    p.start_date,
    p.end_date,
    pi.image_url AS promotion_image_url,
    m.merchant_id,
    m.business_name AS merchant_name,
    m.contact_email AS merchant_email
FROM 
    promotions p
JOIN 
    promotion_images pi ON p.promotion_id = pi.promotion_id
JOIN 
    merchants m ON p.merchant_id = m.merchant_id
ORDER BY 
    p.start_date DESC;
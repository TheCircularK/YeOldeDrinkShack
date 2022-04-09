-- Table: public.Drink

-- DROP TABLE public."Drink";

CREATE TABLE public."Drink"
(
    "drinkID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "drinkName" character varying COLLATE pg_catalog."default" NOT NULL,
    "drinkIngredients" character varying COLLATE pg_catalog."default",
    "drinkPrice" numeric,
    CONSTRAINT "Drink_pkey" PRIMARY KEY ("drinkID")
)

TABLESPACE pg_default;

ALTER TABLE public."Drink"
    OWNER to postgres;
	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('Just Friends', 'Diet Coke + Pineapple, Coconut', 2.15);	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('Your Mom', 'Dr Pepper + Coconut. Blackberry', 2.50);	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('Peach Bod', 'Red Bull + Blackberry, Peach', 3.50);	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('My-Ty', 'Fresca + Grapefruit, Fresh Lime', 2.15);	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('Pixie', 'Lemonade + Blueberry, Pomegranate', 2.50);	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('#Selfie', 'Mtn Dew + Strawberry, Pineapple', 3.00);	
INSERT INTO public."Drink" ("drinkName", "drinkIngredients", "drinkPrice") 
VALUES ('Orange Creamsicle', 'Orange Bang + Vanilla, Half-and-Half, Whipped Cream', 3.75);	

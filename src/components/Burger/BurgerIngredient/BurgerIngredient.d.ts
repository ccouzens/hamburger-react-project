type IngredientType = 'meat' | 'cheese' | 'salad' | 'bacon';

type IngredientBreadType = 'bread-bottom' | 'bread-top' | IngredientType;

const INGREDIENT_TYPES: IngredientType[] = ['meat', 'cheese', 'salad', 'bacon'];

export { IngredientType, IngredientBreadType, INGREDIENT_TYPES };

// strArea           = place of origi of the food item
// strCatogary       = food catogary i.e>dessert,starter etc.
// strIngredient1-20 = ingredients used ....is k sab ingredients ko access kar ne k liye loop laga na padega
// strMeal           = food name
// strMealThumb      = picture of the food
// strTags           = tags given to tht food item
// strSource         = place from where the recipe it taken from
// strYoutube        = youtube video to make that food 



const searchEngine = document.querySelector('#InpForSearch');
const searchButton = document.querySelector('#searchbutton');
const recipeDisplay = document.querySelector('.main');
const recipeCloseButton = document.querySelector('.recipeCloseBtn')
const recipeDetailsContent = document.querySelector('.recipeDetailsContent')


async function fetchRecipe(recipeName){
    recipeDisplay.innerHTML= '<h2><b>Fetching recipe</b></h2>'; //the work is so fast the sometimes this text might not be visible
    try {
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);//whenever using"www."releted links use prfix"https://"...otherwise it will give error
    //dont use inverted comma's ...use back-ticks..this will help us to put variable within it 
    
    const response = await data.json();
    // console.log(response); // this was to check weather the api /code is working properly or not 

    recipeDisplay.innerHTML=''; //this will remove the tag(search recipe...) and then the recipe's will be displayed properly

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML=`
        <img src=${meal.strMealThumb} alt="food image">
        <h3>${meal.strMeal}</h3>
        <p>Origin ${meal.strArea}</p>
        `
        recipeDiv.style.color='black'

        const viewRecipe = document.createElement('button')
        viewRecipe.classList.add('viewButt')
        viewRecipe.innerHTML= 'View Recipe'
        recipeDiv.appendChild(viewRecipe)

        // now adding eventlistner to view-recipe button
        viewRecipe.addEventListener("click",()=>{
            openRecipePopup(meal)
        })

        recipeDisplay.appendChild(recipeDiv)
    });
        
    } catch (err) {
        recipeDisplay.innerHTML= '<h2><b>OOP"s Recipe does not exist</b></h2>'        
    }
    

}
// for details of ingredients and measurements
function fetchIngredients(meal){
    let ingredientList = ""
        for( let i = 1; i <=20 ;i++){
            const ingredient =meal[`strIngredient${i}`]
            if (ingredient) {
                const measure = meal[`strMeasure${i}`]
                ingredientList += `<li>${measure} ${ingredient}  </li>`
            } else {
                break
            }
        }
        return ingredientList
}

// for popup of view recipe
function openRecipePopup(meal){
    recipeDetailsContent.innerHTML= `
        <h2 class ='recipeKAnaam'>${meal.strMeal}</h2>
        <h3>Ingredients:  </h3>
        <ul class = 'ingredientList'>${fetchIngredients(meal)}</ul>
        <div class='recipeInstructions'>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>

    `
    
    recipeDetailsContent.parentElement.style.display ='block'
}

recipeCloseButton.addEventListener('click',function(){
    recipeDetailsContent.parentElement.style.display = 'none'
})

searchButton.addEventListener('click',function(eve){
    eve.preventDefault();
    const searchInput = searchEngine.value.trim();
    if (!searchInput) {
        recipeDisplay.innerHTML= '<h2><b>Type the meal in search engine</b></h2>'
        return
    }
    fetchRecipe(searchInput);
})



// ADDITIONAL FUNCTNLITY
// jo food item search pe click kar ne par aa rahi thi wo item's normally display pe visible honi chahiye
// view recipe pe click kar ne k baad backgroung blurr ho jana chahiye
// transition for opening the popup of view recipe 
// optioin of adding out own recipe
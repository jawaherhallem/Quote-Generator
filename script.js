const quoteContainer = document.getElementById('quote-container')
const quoteTexte = document.getElementById('quote')
const autherTexte = document.getElementById('auther')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// show loading
function loading(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuotes(){
    // Pick a random quote from apiQuotes array
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // console.log(quote);
    // check if Auther field is blank and replace it with 'Unknown'
    if(!quote.auther){
        autherTexte.textContent = 'Unknown';   
    } else{
        autherTexte.textContent = quote.auther;
    }
    // check Quote length to determine styling
    if(quote.text.length > 120){
        quoteTexte.classList.add('long-quote');
    }else{
        quoteTexte.classList.remove('long-quote');
    }
    //  set Quote, hide loader
    quoteTexte.textContent = quote.text;
}


// Get quotes From API
async function getQuotes(){
    loading()
    const apiUrl ='https://type.fit/api/quotes'
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes)
        newQuotes ();
    } catch (console){
        //  Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    loading()
    const twitterurl = `https://twitter.com/intent/tweet?${quoteTexte.textContent} -${autherTexte.textContent}`;
    window.open(twitterurl, '_blank');
  
}


// newQuotes();
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);


// On Load

getQuotes();
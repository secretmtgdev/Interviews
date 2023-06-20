class TrieNode {
    children = Array(26).fill(null);
    isEnd = false;
}

const root = new TrieNode();

function createTree() {
    const words = getWords();
    const addWord = (curNode, index, word) => {
        if (index === word.length) {
            return;
        }

        const newNode = new TrieNode();
        const _index = getIndex(word, index);
        if (!curNode.children[_index]) curNode.children[_index] = newNode;
        if (index === word.length - 1) newNode.isEnd = true;

        addWord(curNode.children[_index], index + 1, word);
    }

    words.forEach(word => addWord(root, 0, word));
}

function searchTree(prefix) {
    curNode = root;
    for(let i = 0; i < prefix.length; i++) {
        const idx = getIndex(prefix, i);
        if(!curNode.children[idx]) {
            return [];
        }

        curNode = curNode.children[idx];
    }

    const suggestionResults = [];
    const dfs = (cNode, curWord) => {
        if (!cNode) {
            return;
        }

        if (cNode.isEnd) {
            suggestionResults.push(curWord.join(''));
        }

        for (let i = 0; i < cNode.children.length; i++) {
            const child = cNode.children[i];
            if (child) {
                curWord.push(getCharacter(i));
                dfs(child, curWord);
                curWord.pop();
            } 
        }
    }

    dfs(curNode, prefix.split());
    return suggestionResults;
}

function getSuggestions() {
    const curWord = document.getElementById('search-bar').value;
    const suggestedWords = searchTree(curWord);
    console.error(suggestedWords);
}

function getWords() {
    return ['cat', 'bat', 'sat', 'bar', 'bare'];
}

function init() {
    createTree();
}

function getIndex(word, index) {
    return word.charCodeAt(index) - 97;
}

function getCharacter(index) {
    return String.fromCharCode(index + 97);
}

init();

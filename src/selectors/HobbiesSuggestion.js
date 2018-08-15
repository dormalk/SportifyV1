export const fields = [    'כדורגל',
                    'כדורסל',
                    'טניס',
                    'כדורעף',
                    'ריצות קצרות',
                    'ריצות ארוכות'];

export const isPartOfHobbie = (value) => {
    var isPart = false;
    for(var i=0;i<fields.length;i++)
        if(isPart = fields[i].startsWith(value)) break;
    return isPart;
}

export const isHobbie = (value) => {
    var _isHobbie = false;
    for(var i=0;i<fields.length;i++)
        if(fields[i] === value){
            _isHobbie = true;
            break;
        } 
    return _isHobbie;    
}


export const fields = [    
                    'כדורגל',
                    'כדורסל',
                    'טניס',
                    'כדורעף',
                    'ריצות קצרות',
                    'ריצות ארוכות',
                    'כדוררשת',
                    'TRX',
                    'אימוני כוח',
                    'סקווש',
                    'הליכות',
                    'אגרוף תאילנדי',
                    'קראטה',
                    'MMA',
                    'גודו',
                    'שחייה',
                    'קפיצה לרוחק',
                    'טיפוס'
                ];

export const isPartOfHobbie = (value) => {
    var isPart = false;
    for(var i=0;i<fields.length;i++){
        if(isPart = fields[i].startsWith(value)) break;
    }
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


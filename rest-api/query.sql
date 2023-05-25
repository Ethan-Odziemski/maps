select pipes.pipeID, coordinates.section, coordinates.lat, coordinates.lng
from pipes
inner join coordinates on pipes.pipeID=coordinates.pipeID;
-- where pipes.pipeID = 1000001;

delete from pipes where pipeID=1000001;
delete from coordinates where pipeID=1000001;

select * from coordinates;
select * from pipes;


drop table pipes;
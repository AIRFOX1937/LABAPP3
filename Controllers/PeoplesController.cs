using LABAPP3.Models;
using Microsoft.AspNetCore.Mvc;
 using Microsoft.EntityFrameworkCore;


namespace LABAPP3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeoplesController : ControllerBase
    {
        private PeoplesContext? _db;
        public PeoplesController(PeoplesContext peoplesContext)

        {
            _db = peoplesContext;
        }
        // GET: api/<PeoplesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<People>>> Get()
        {
            return await _db.People.ToListAsync();
        }
        // GET api/<PeoplesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<People>> Get(int id)
        {
            People people = await _db.People.FirstOrDefaultAsync(x => x.Id == id);
            if (people == null)
                return NotFound();
            return new ObjectResult(people);
        }
        // POST api/<PeoplesController>
        [HttpPost]
        public async Task<ActionResult<People>> Post(People people)
        {
            if (people == null)
            {
                return BadRequest();
            }
            _db.People.Add(people);
            await _db.SaveChangesAsync();
            return Ok(people);
        }
        // PUT api/<PeoplesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<People>> Put(People people)
        {
            if (people == null)
            {
                return BadRequest();
            }
            if (!_db.People.Any(x => x.Id == people.Id))
            {
                return NotFound();
            }

            _db.Update(people);
            await _db.SaveChangesAsync();
            return Ok(people);
        }
        // DELETE api/<PeoplesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<People>> Delete(int id)
        {
            People people = _db.People.FirstOrDefault(x => x.Id == id);
            if (people == null)
            {
                return NotFound();
            }
            _db.People.Remove(people);
            await _db.SaveChangesAsync();
            return Ok(people);
        }
    }
}

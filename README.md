# JetpacPVLI

## Mecánica
### Menús

#### Menú principal
Un menú principal con cuatro botones: 
* Nuevo juego: si se pulsa este botón el juego comienza en el nivel 1 y se va avanzando de forma lineal por los tres niveles.
* Nivel 1: si se pulsa este botón el juego carga el primer nivel y al completarlo se carga el menú de victoria o derrota.
* Nivel 2: si se pulsa este botón el juego carga el segundo nivel y al completarlo se carga el menú de victoria o derrota.
* Nivel 3: si se pulsa este botón el juego carga el tercer nivel y al completarlo se carga el menú de victoria o derrota.
#### Menú final
El menú final aparece cuando la partida termina. Tiene dos aspectos: de derrota y de victoria. En ambos aspectos se escribirá la puntuación obtenida.
### Movimiento
El movimiento del personaje se realizará con A y D para el movimiento horizontal. El movimiento horizontal es toroidal lo cual quiere decir que si se avanza lo suficiente por uno de los lados de la pantalla se aparece por el otro. 
### Jetpac
El movimiento vertical se realiza con la tecla W. Visualmente el movimiento se realiza gracias a un jetpac. Hay que mantener pulsado para activar el jetpac y una vez se deja de pulsar el espacio este se desactiva dejando caer al personaje. No hay límite de cuan alto el personaje puede llegar. No hay daño de caída.
### Escape del planeta
El paso de nivel se produce cuando la nave esté completamente reparada y se haya metido en esta suficiente combustible. Estas mecánicas se explican abajo.
#### Reparación
La reparación de la nave se realiza llevando las piezas que aparecen al comienzo del nivel hasta la nave. Este número de piezas es siempre el mismo y aparecen al principio del nivel.
#### Combustible
Una vez la nave esté reparada aparecerá en el nivel un paquete de combustible. Cuando este sea entregado en la nave aparecerá otro. El combustible seguirá apareciendo hasta que la nave esté totalmente cargada con combustible.
### Pistola láser
El personaje puede disparar un láser en la dirección donde esté mirando. Este láser se dispara con el espacio. El láser destruirá meteoritos y matará enemigos en contacto.
### Vida y muerte
El jugador tiene tres vidas. Cada vez que que pierda una vida su posición se reiniciará a la del comienzo del nivel y ganará dos segundos de invulnerabilidad. Al perder la tercera vida el juego termina y se carga la pantalla de final con el aspecto de derrota.
### Aliens
Los enemigos aparecen en intervalos de tiempo cada vez más pequeños dependiendo del nivel. Todos los enemigos matarán al jugador en contacto, restando una vida. Todos los enemigos aparecen por los laterales y tienen movimiento toroidal.
#### Setas
Las setas son objetos con físicas muy parecidas al jugador. Andarán por el suelo yendo siempre en la misma dirección.  Su color es siempre rojo. Estos enemigos aparecen en el primer nivel.
#### Halcones
Los halcones son objetos voladores que mantienen su altura durante todo su recorrido. Tienen una velocidad relativamente alta. Su color será aleatorio entre rojo y verde. Estos enemigos aparecen en el segundo nivel.
#### Pompas
Las pompas son esferas que irán rebotando por el escenario. Su color será aleatorio entre rojo, azul y verde. Estos enemigos aparecen en el tercer nivel.
### Meteoritos
Los meteoritos salen siempre en el mismo intervalo de tiempo desde el techo del nivel. Los meteoritos matan al jugador en contacto, restando una vida. Su velocidad es siempre la misma. Siempre aparecen de color blanco.
### Recursos
Los recursos aparecen siempre en el mismo intervalo de tiempo. Aparecen desde el techo del nivel. Al ser recogidos suman 500 puntos a la puntuación.
### Mundos
Los tres mundos tendrán tres plataformas. Cada plataforma está a una altura distinta pero las alturas son constantes entre niveles. 
El primer nivel será: media, baja, alta. El segundo nivel será: baja, alta, media. El tercer nivel será: alta, media, baja.
La nave y el jugador siempre aparecen en los mismos puntos independientemente del nivel.
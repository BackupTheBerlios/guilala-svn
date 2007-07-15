package drawing;

import javax.swing.*; // For JPanel, etc.
import java.awt.*; // For Graphics, etc.
import java.awt.geom.*; // For Ellipse2D, etc.

// An example of drawing/filling shapes with Java 2D in Java 1.2 and later.

public class ShapeExample extends JPanel{
	public static final long serialVersionUID = 3;
	
	private Ellipse2D.Double circle = new Ellipse2D.Double(10, 10, 350, 350);
	// private Rectangle2D.Double square = new Rectangle2D.Double(10, 10, 350, 350);

	public void paintComponent(Graphics g) {
		clear(g);
		Graphics2D g2d = (Graphics2D)g;
		g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

		g2d.fill(circle);
//		g2d.draw(square);
	}

	// super.paintComponent clears off screen pixmap, since we're using double buffering by default.
	protected void clear(Graphics g) {
		super.paintComponent(g);
	}

	protected Ellipse2D.Double getCircle() {
		return(circle);
	}

	public static void main(String[] args) {
		WindowUtilities.openInJFrame(new ShapeExample(), 200, 200);
	}
}
